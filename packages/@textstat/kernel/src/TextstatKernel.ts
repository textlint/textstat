import {
    TextlintKernel,
    TextlintKernelPlugin,
    TextlintPluginDescriptors,
    TextlintPluginDescriptor,
    TextlintRuleOptions
} from "@textlint/kernel";
import { TextstatKernelFilterRule, TextstatKernelRule, TextstatRuleSharedDependencies } from "@textstat/rule-context";
import * as path from "path";
import { LocaleTag } from "@textstat/rule-context";
import { validateResult } from "./ResultValidator";
import { TextstatResult } from "./type";

function bindTrailingArgs(fn: any, sharedDeps: TextstatRuleSharedDependencies) {
    return function(context: any, options?: any) {
        if (typeof fn.default === "function") {
            return fn.default(context, options, sharedDeps);
        } else {
            return (fn as any)(context, options, sharedDeps);
        }
    };
}

export const createParser = (plugins: TextlintKernelPlugin[] = []) => {
    const textlintPluginDescriptors = plugins.map(plugin => {
        return new TextlintPluginDescriptor(plugin);
    });
    const pluginDescriptors = new TextlintPluginDescriptors(textlintPluginDescriptors);
    return {
        parse(text: string, filePath: string) {
            const ext = path.extname(filePath);
            const plugin = pluginDescriptors.findPluginDescriptorWithExt(ext);
            if (!plugin) {
                throw new Error("Anyone does not support ext" + ext);
            }
            return plugin.processor.processor(ext).preProcess(text, filePath);
        }
    };
};

type TextstatRulePreset = {
    rules: { [index: string]: TextstatKernelRule };
    rulesConfig: { [index: string]: TextlintRuleOptions | boolean };
};
type TextSTateRulePresetFactory = {
    createPreset: () => TextstatRulePreset;
};

// @ts-ignore
function isRulePresetFactory(v: any): v is TextSTateRulePresetFactory {
    return typeof v === "object" && v.createPreset === "function";
}

// @ts-ignore
function createTextstatPresetToTextlintPreset(
    preset: TextstatRulePreset,
    sharedDependencies: TextstatRuleSharedDependencies
) {
    const rules = Object.keys(preset.rules).map(key => {
        const rule = preset.rules[key];
        return {
            ruleId: rule.ruleId,
            rule: bindTrailingArgs(rule.rule.report, sharedDependencies),
            options: rule.options
        };
    });
    return {
        rules,
        rulesConfig: preset.rulesConfig
    };
}

export class TextstatKernel {
    report(
        text: string,
        options: {
            ext: string;
            filePath?: string;
            plugins?: TextlintKernelPlugin[];
            rules?: TextstatKernelRule[];
            filterRules?: TextstatKernelFilterRule[];
            configBaseDir?: string;
            sharedDeps: {
                locale?: LocaleTag;
                filePathList: string[];
            };
        }
    ): Promise<TextstatResult> {
        const kernel = new TextlintKernel();
        const parserDeps = createParser(options.plugins);
        const sharedDependencies: TextstatRuleSharedDependencies = {
            locale: options.sharedDeps.locale,
            filePathList: options.sharedDeps.filePathList,
            parser: parserDeps
        };
        return kernel
            .lintText(text, {
                ext: options.ext,
                filePath: options.filePath,
                // Wrap with (context, options, deps) => {}
                rules:
                    options.rules &&
                    options.rules.map(rule => {
                        return {
                            ruleId: rule.ruleId,
                            rule: bindTrailingArgs(rule.rule.report, sharedDependencies),
                            options: rule.options
                        };
                    }),
                filterRules:
                    options.filterRules &&
                    options.filterRules.map(rule => {
                        return {
                            ruleId: rule.ruleId,
                            rule: bindTrailingArgs(rule.rule.report, sharedDependencies),
                            options: rule.options
                        };
                    }),
                plugins: options.plugins
            })
            .then(result => {
                if (!validateResult(result)) {
                    throw new Error("result is not compatible TextstatResult");
                }
                return result;
            });
    }
}
