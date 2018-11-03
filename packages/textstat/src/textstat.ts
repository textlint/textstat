import { TextstatKernel } from "@textstat/kernel";
import * as path from "path";
import * as fs from "fs";
import { createPreset } from "@textstat/textstat-rule-preset-standard";
import { TextstatRulePreset } from "@textstat/rule-context";

const glob = require("glob");

function createTextstatPresetToTextlintPreset(preset: TextstatRulePreset) {
    return Object.keys(preset.rules).map(key => {
        const rule = preset.rules[key];
        return {
            ruleId: key,
            rule: rule,
            options: preset.rulesConfig[key]
        };
    });
}

export async function run(globPattern: string) {
    const fileList = glob.sync(globPattern);
    const textstat = new TextstatKernel();
    const promises = fileList.map((filePath: string) => {
        const text = fs.readFileSync(filePath, "utf-8");
        return textstat.report(text, {
            filePath: filePath,
            ext: path.extname(filePath),
            rules: createTextstatPresetToTextlintPreset(createPreset()),
            plugins: [
                {
                    pluginId: "markdown",
                    plugin: require("@textlint/textlint-plugin-markdown")
                }
            ],
            sharedDeps: {
                filePathList: fileList,
                locale: "en"
            }
        });
    });
    return Promise.all(promises);
}
