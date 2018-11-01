"use strict";
import { TextstatRuleReporter, Localize } from "@textstat/rule-context";
import * as fs from "fs";
import * as path from "path";

const isUrl = require("is-url");
const visit = require("unist-util-visit");
const stripHash = (pathString: string) => {
    // remove #
    return pathString.replace(/#.*$/, "");
};
export const meta = {
    docs: {
        homepage: require("../package.json").homepage,
        description: require("../package.json").description
    },
    messages: {
        message: {
            en: "Dependency links in the document",
            ja: "ドキュメントの依存関係"
        },
        "To Links": {
            en: "To Links",
            ja: "リンク先"
        },
        "From Links": {
            en: "From Links",
            ja: "リンク元"
        }
    }
};
export const report: TextstatRuleReporter = function(context, _options, deps) {
    const { Syntax, report, getFilePath } = context;
    const { t } = new Localize(meta.messages, deps.locale);
    const toLinks: {
        type: "url" | "file";
        path: string;
    }[] = [];
    const fromLinks: {
        type: "file";
        path: string;
    }[] = [];
    const currentFilePath = getFilePath();
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
        if (currentFilePath !== absoluteToUrl) {
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
        } else if (currentFilePath) {
            toLinks.push({
                type: "file",
                path: path.resolve(path.dirname(currentFilePath), stripHash(urlString))
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
                message: t("message"),
                range: node.range,
                details: [
                    {
                        name: t("To Links"),
                        value: toLinks
                    },
                    {
                        name: t("From Links"),
                        value: fromLinks
                    }
                ]
            });
        }
    };
};
