import * as path from "path";
import { runTest } from "@textstat/textstat-tester";
import * as rule from "../src/index.js";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
