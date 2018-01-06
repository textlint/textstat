import { TextlintKernel, TextlintResult } from "@textlint/kernel";
import fileSizeRule from "@textstat/textstat-rule-filesize";
import * as fs from "fs";
import * as path from "path";

const markdown = require("textlint-plugin-markdown");

export class Textstat {
    report(filePath: string): Promise<TextlintResult> {
        const kernel = new TextlintKernel();
        const text = fs.readFileSync(filePath, "utf-8");
        return kernel.lintText(text, {
            ext: path.extname(filePath),
            filePath,
            rules: [
                {
                    ruleId: "file-size",
                    rule: fileSizeRule
                }
            ],
            plugins: [
                {
                    pluginId: "markdown",
                    plugin: markdown
                }
            ]
        });
    }
}
