import { TextlintRuleOptions } from "@textlint/kernel";
import RuleContext from "@textlint/kernel/lib/kernel/src/core/rule-context";
import FilterRuleContext from "@textlint/kernel/lib/kernel/src/core/filter-rule-context";
import { TxtNode, TxtNodeType } from "@textlint/kernel/lib/ast-node-types/src";
import { LocaleTag, LocalizeMessages } from "./Localize";

export type TextstatRuleSharedDependencies = {
    // locale for message
    // Default: en
    locale?: LocaleTag;
    // target to stat
    filePathList: string[];
    // parser
    parser: {
        parse(text: string, ext: string): TxtNode;
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
    context: Readonly<RuleContext>,
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
    context: Readonly<FilterRuleContext>,
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
