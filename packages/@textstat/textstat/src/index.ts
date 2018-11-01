import {
    TextlintKernel,
    TextlintKernelPlugin,
    TextlintResult,
    TextlintPluginDescriptors,
    TextlintPluginDescriptor
} from "@textlint/kernel";
import { TextstatKernelFilterRule, TextstatKernelRule, TextstatRuleSharedDependencies } from "@textstat/rule-context";
import * as path from "path";
import { LocaleTag } from "@textstat/rule-context/lib/src/Localize";

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

export class Textstat {
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
    ): Promise<TextlintResult> {
        const kernel = new TextlintKernel();
        const parserDeps = createParser(options.plugins);
        const sharedDependencies: TextstatRuleSharedDependencies = {
            locale: options.sharedDeps.locale,
            filePathList: options.sharedDeps.filePathList,
            parser: parserDeps
        };
        return kernel.lintText(text, {
            ext: options.ext,
            filePath: options.filePath,
            // Wrap with (context, options, deps) => {}
            rules:
                options.rules &&
                options.rules.map(rule => {
                    return {
                        ...rule,
                        rule: bindTrailingArgs(rule.rule, sharedDependencies)
                    };
                }),
            filterRules:
                options.filterRules &&
                options.filterRules.map(rule => {
                    return {
                        ...rule,
                        rule: bindTrailingArgs(rule.rule, sharedDependencies),
                        parser: parserDeps
                    };
                }),
            plugins: options.plugins
        });
    }
}
