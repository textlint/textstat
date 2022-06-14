import { TextlintRuleOptions } from "@textlint/kernel";
import { LocaleTag, LocalizeMessages } from "./Localize.js";
import { TxtNode, TxtNodeType } from "@textlint/ast-node-types";
import { TextlintFilterRuleContext, TextlintRuleContext } from "@textlint/types";
import type { TextlintPluginPreProcessResult } from "@textlint/types/lib/src/Plugin/TextlintPluginModule.js";

export type TextstatRuleSharedDependencies = {
    // locale for message
    // Default: en
    locale?: LocaleTag;
    // target to stat
    filePathList: string[];
    // parser
    parser: {
        parse(text: string, ext: string): TextlintPluginPreProcessResult | Promise<TextlintPluginPreProcessResult>;
    };
};

/**
 * Meta type
 */
export type TextstatRuleMeta = {
    docs: {
        homepage?: string;
        description?: string;
    };
    messages: LocalizeMessages;
};

export type TextstatRuleReporter = (
    context: Readonly<TextlintRuleContext>,
    options: TextlintRuleOptions,
    deps: TextstatRuleSharedDependencies
) => { [P in TxtNodeType]?: (node: TxtNode) => void | Promise<any> };

export interface TextstatKernelRule {
    ruleId: string;
    rule: {
        meta: TextstatRuleMeta;
        report: TextstatRuleReporter;
    };
    options?: TextlintRuleOptions | boolean;
}

export type TextstatFilterRuleReporter = (
    context: Readonly<TextlintFilterRuleContext>,
    options: TextlintRuleOptions,
    deps: TextstatRuleSharedDependencies
) => { [P in TxtNodeType]?: (node: TxtNode) => void | Promise<any> };

export interface TextstatKernelFilterRule {
    ruleId: string;
    rule: {
        meta: TextstatRuleMeta;
        report: TextstatFilterRuleReporter;
    };
    options?: TextlintRuleOptions | boolean;
}
