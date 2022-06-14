import * as path from "path";
import { runTest } from "@textstat/textstat-tester";
import * as rule from "../src/index.js";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import glob from "glob";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
