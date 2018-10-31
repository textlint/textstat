import * as path from "path";
import { runTest } from "@textstat/textstat-tester";
import * as rule from "../src/index";

describe("textstat-rule-tateish-level", () => {
    runTest(path.join(__dirname, "snapshots"), {
        rules: [
            {
                ruleId: "textstat-rule-tateish-level",
                rule: rule
            }
        ]
    });
});
