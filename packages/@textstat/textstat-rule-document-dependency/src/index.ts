"use strict";
import { TextstatRuleReporter } from "@textstat/rule-context";
import * as fs from "fs";
import * as path from "path";

const isUrl = require("is-url");
const visit = require("unist-util-visit");
const stripHash = (pathString: string) => {
    // remove #
    return pathString.replace(/#.*$/, "");
};
const report: TextstatRuleReporter = function(context, _options, deps) {
    const { Syntax, report, getFilePath } = context;
    const toLinks: {
        type: "url" | "file";
        path: string;
    }[] = [];
    const fromLinks: {
        type: "file";
        path: string;
    }[] = [];
    const filePath = getFilePath();
    /**
     * Add "From to the document" link
     * @param baseFilePath
     * @param urlString
     */
    const addFromLink = (baseFilePath: string, urlString?: string) => {
        if (!urlString) {
            return;
        }
        if (isUrl(urlString)) {
            return;
        }
        const absoluteToUrl = path.resolve(path.dirname(baseFilePath), stripHash(urlString));
        if (filePath !== absoluteToUrl) {
            return;
        }
        fromLinks.push({
            type: "file",
            path: baseFilePath
        });
    };
    deps.filePathList.forEach(fromFilePath => {
        const text = fs.readFileSync(fromFilePath, "utf-8");
        const AST = deps.parser.parse(text, fromFilePath);
        visit(AST, [Syntax.Link, "Definition"], (node: any) => {
            addFromLink(fromFilePath, node.url);
        });
    });
    /**
     * Add "The document to" link
     * @param urlString
     */
    const addToLink = (urlString?: string) => {
        if (!urlString) {
            return;
        }
        if (isUrl(urlString)) {
            toLinks.push({
                type: "url",
                path: urlString
            });
        } else {
            toLinks.push({
                type: "file",
                path: stripHash(urlString)
            });
        }
    };
    return {
        [Syntax.Link](node) {
            addToLink(node.url);
        },
        ["Definition"](node) {
            addToLink(node.url);
        },
        [`${Syntax.Document}:exit`](node) {
            report(node, {
                message: "Dependency links in the document",
                range: node.range,
                details: [
                    {
                        name: "To Links",
                        urls: toLinks
                    },
                    {
                        name: "From Links",
                        urls: fromLinks
                    }
                ]
            });
        }
    };
};
export default report;
