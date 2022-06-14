import * as path from "path";
import { runTest } from "@textstat/textstat-tester";
import * as rule from "../src/index.js";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
