import { TextlintRuleOptions } from "@textlint/kernel";
import RuleContext from "@textlint/kernel/lib/kernel/src/core/rule-context";
import FilterRuleContext from "@textlint/kernel/lib/kernel/src/core/filter-rule-context";
import { TxtNode, TxtNodeType } from "@textlint/kernel/lib/ast-node-types/src";

export type TextstatRuleSharedDependencies = {
    // target to stat
    filePathList: string[];
    // parser
    parser: {
        parse(text: string, ext: string): TxtNode;
    };
};

export type TextstatRuleReporter = (
    context: Readonly<RuleContext>,
    options: TextlintRuleOptions,
    deps: TextstatRuleSharedDependencies
) => { [P in TxtNodeType]?: (node: TxtNode) => void | Promise<any> };

export interface TextstatKernelRule {
    ruleId: string;
    rule: TextstatRuleReporter;
    options?: TextlintRuleOptions | boolean;
}

export type TextstatFilterRuleReporter = (
    context: Readonly<FilterRuleContext>,
    options: TextlintRuleOptions,
    deps: TextstatRuleSharedDependencies
) => { [P in TxtNodeType]?: (node: TxtNode) => void | Promise<any> };

export interface TextstatKernelFilterRule {
    ruleId: string;
    rule: TextstatFilterRuleReporter;
    options?: TextlintRuleOptions | boolean;
}
