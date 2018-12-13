import * as fs from "fs";
import * as path from "path";
import { TextstatKernel } from "@textstat/kernel";
import { TextstatRulePreset } from "@textstat/rule-context";
import { createPreset } from "@textstat/textstat-rule-preset-standard";
import globby from "globby";

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

export interface ReportOptions {
    locale: string;
    globPatterns: string[];
}

export async function report(options: ReportOptions) {
    const fileList = await globby(options.globPatterns);
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
                locale: options.locale
            }
        });
    });
    return Promise.all(promises);
}
