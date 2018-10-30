import * as path from "path";
import { runTest } from "@textstat/textstat-tester";
import rule from "../src/index";

describe("textstat-rule-number-of-sentences", () => {
    runTest(path.join(__dirname, "snapshots"), {
        rules: [
            {
                ruleId: "textstat-rule-number-of-sentences",
                rule: rule
            }
        ]
    });
});
