import { Textstat } from "@textstat/textstat";
import { TextstatKernelRule } from "@textstat/rule-context";

import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";

export function runTest(
    snopshotDirectory: string,
    {
        rules,
        sharedDeps
    }: {
        rules: TextstatKernelRule[];
        sharedDeps?: {
            filePathList: string[];
        };
    }
) {
    const textstat = new Textstat();
    fs.readdirSync(snopshotDirectory).map(caseName => {
        const normalizedTestName = caseName.replace(/-/g, " ");
        it(`Test ${normalizedTestName}`, async () => {
            const fixtureDir = path.join(snopshotDirectory, caseName);
            const actualFilePath = path.join(fixtureDir, "input.md");
            const actualContent = fs.readFileSync(actualFilePath, "utf-8");
            const actualResult = await textstat.report(actualContent, {
                filePath: actualFilePath,
                ext: path.extname(actualFilePath),
                rules: rules,
                plugins: [
                    {
                        pluginId: "markdown",
                        plugin: require("@textlint/textlint-plugin-markdown")
                    }
                ],
                sharedDeps: sharedDeps || {
                    filePathList: [actualFilePath]
                }
            });
            const cwdReplacer = (_key: string, value: string) => {
                if (typeof value === "string") {
                    return value.replace(snopshotDirectory, "<snapshot>").replace(/\\/g, "/");
                }
                return value;
            };
            const expectedFilePath = path.join(fixtureDir, "output.json");
            const existExpectedFile = fs.existsSync(expectedFilePath);
            // UPDATE_SNAPSHOT=1 npm test
            // Update snapshot
            if (process.env.UPDATE_SNAPSHOT || !existExpectedFile) {
                fs.writeFileSync(expectedFilePath, JSON.stringify(actualResult, cwdReplacer, 4));
                return;
            }
            // Input === Output
            const expectedResult = JSON.parse(fs.readFileSync(expectedFilePath, "utf-8"));
            assert.deepStrictEqual(
                // remove undefined prop
                JSON.parse(JSON.stringify(actualResult, cwdReplacer)),
                expectedResult,
                `
${fixtureDir}
${JSON.stringify(actualResult)}
`
            );
        });
    });
}
