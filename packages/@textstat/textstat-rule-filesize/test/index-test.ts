import * as path from "path";
import { runTest } from "@textstat/textstat-tester";
import * as rule from "../src/index";

describe("textstat-rule-filesize", () => {
    describe("en", () => {
        runTest(path.join(__dirname, "snapshots/en"), {
            rules: [
                {
                    ruleId: "textstat-rule-filesize",
                    rule: rule
                }
            ]
        });
    });
    describe("ja", () => {
        runTest(path.join(__dirname, "snapshots/ja"), {
            rules: [
                {
                    ruleId: "textstat-rule-filesize",
                    rule: rule
                }
            ],
            sharedDeps: {
                locale: "ja"
            }
        });
    });
});
