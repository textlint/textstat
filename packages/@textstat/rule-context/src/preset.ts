import { TextlintRuleOptions } from "@textlint/kernel";
import { TextstatRuleMeta, TextstatRuleReporter } from "./report-type";
/**
 * Textstat Rule preset
 */
export type TextstatRulePreset = {
    rules: {
        [index: string]: {
            meta: TextstatRuleMeta;
            report: TextstatRuleReporter;
        };
    };
    rulesConfig: { [index: string]: TextlintRuleOptions | boolean };
};

export type TextstatRulePresetFactory = {
    // TODO: support option
    createPreset: () => TextstatRulePreset;
};

export function isTextstatRulePresetFactory(v: any): v is TextstatRulePresetFactory {
    return typeof v === "object" && v.createPreset === "function";
}
