import { TextlintKernel, TextlintKernelPlugin, TextlintResult } from "@textlint/kernel";
import { TextstatKernelFilterRule, TextstatKernelRule, TextstatRuleSharedDependencies } from "@textstat/rule-context";

function bindTrailingArgs(fn: any, ...trailingArgs: Array<any>) {
    return function(context: any, options?: any) {
        if (typeof fn.default === "function") {
            return fn.default(context, options, ...trailingArgs);
        } else {
            return (fn as any)(context, options, ...trailingArgs);
        }
    };
}

export class Index {
    report(
        text: string,
        options: {
            ext: string;
            filePath?: string;
            plugins?: TextlintKernelPlugin[];
            rules?: TextstatKernelRule[];
            filterRules?: TextstatKernelFilterRule[];
            configBaseDir?: string;
            sharedDeps: TextstatRuleSharedDependencies;
        }
    ): Promise<TextlintResult> {
        const kernel = new TextlintKernel();
        return kernel.lintText(text, {
            ext: options.ext,
            filePath: options.filePath,
            // Wrap with (context, options, deps) => {}
            rules:
                options.rules &&
                options.rules.map(rule => {
                    return {
                        ...rule,
                        rule: bindTrailingArgs(rule.rule, options.sharedDeps)
                    };
                }),
            filterRules:
                options.filterRules &&
                options.filterRules.map(rule => {
                    return {
                        ...rule,
                        rule: bindTrailingArgs(rule.rule, options.sharedDeps)
                    };
                }),
            plugins: options.plugins
        });
    }
}
