import { Textstat } from "../src";
import * as fs from "fs";
import * as path from "path";

const glob = require("glob");
describe("Textstat", () => {
    it("work", async () => {
        const textstat = new Textstat();
        const filePathList = glob.sync("/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/**/*.md");
        const filePath = "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/statement-expression/README.md";
        const text = fs.readFileSync(filePath, "utf-8");
        const results = await textstat.report(text, {
            filePath,
            ext: path.extname(filePath),
            rules: [
                {
                    ruleId: "filesize",
                    rule: require("@textstat/textstat-rule-filesize")
                },
                {
                    ruleId: "document-dependency",
                    rule: require("@textstat/textstat-rule-document-dependency")
                }
            ],
            plugins: [
                {
                    pluginId: "markdown",
                    plugin: require("@textlint/textlint-plugin-markdown")
                }
            ],
            sharedDeps: {
                filePathList: filePathList
            }
        });
        console.log(JSON.stringify(results, null, 4));
    });
});
