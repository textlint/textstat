import * as path from "path";
import { runTest } from "@textstat/textstat-tester";
import * as rule from "../src/index";

const glob = require("glob");
describe("textstat-rule-document-dependency", () => {
    const snapshotDir = path.join(__dirname, "snapshots");
    runTest(snapshotDir, {
        rules: [
            {
                ruleId: "textstat-rule-document-dependency",
                rule: rule
            }
        ],
        sharedDeps: {
            filePathList: glob.sync(`${snapshotDir}/**/*.md`)
        }
    });
});
