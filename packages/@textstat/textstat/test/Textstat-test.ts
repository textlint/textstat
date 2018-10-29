import { Index } from "../src/Textstat";
import * as fs from "fs";
import * as path from "path";

describe("Textstat", () => {
    it("work", async () => {
        const textstat = new Index();
        const filePath = path.join(__dirname, "../README.md");
        const text = fs.readFileSync(filePath, "utf-8");
        const results = await textstat.report(text, {
            filePath,
            ext: path.extname(filePath),
            rules: [
                {
                    ruleId: "filesize",
                    rule: require("@textstat/textstat-rule-filesize")
                }
            ],
            plugins: [
                {
                    pluginId: "markdown",
                    plugin: require("@textlint/textlint-plugin-markdown")
                }
            ],
            sharedDeps: {
                filePathList: [filePath]
            }
        });
        console.log(JSON.stringify(results, null, 4));
    });
});
