import * as assert from "assert";
import { TextstatKernel } from "../src/TextstatKernel";
import * as rule from "./rule/textstat-rule-example";

describe("@textstat/kernel", function() {
    it("work", async () => {
        const kernel = new TextstatKernel();
        const result = await kernel.report(
            `# Header

This is example.
`,
            {
                rules: [
                    {
                        ruleId: "textstat-rule-example",
                        rule: rule
                    }
                ],
                plugins: [
                    {
                        pluginId: "markdown",
                        plugin: require("@textlint/textlint-plugin-markdown")
                    }
                ],
                filterRules: [],
                sharedDeps: {
                    filePathList: ["/path/to/example.md", "/path/to/example.a.md"]
                },
                filePath: "/path/to/example.md",
                ext: ".md"
            }
        );
        assert.deepStrictEqual(result, {
            messages: [
                {
                    type: "lint",
                    ruleId: "textstat-rule-example",
                    message: "Number of characters of the document",
                    index: 0,
                    line: 1,
                    column: 1,
                    severity: 2,
                    fix: undefined,
                    data: {
                        details: [
                            {
                                name: "Number of characters",
                                value: 27
                            }
                        ],
                        message: "Number of characters of the document",
                        range: [0, 27]
                    }
                }
            ],
            filePath: "/path/to/example.md"
        });
    });
});
