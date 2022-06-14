import { TextlintRuleOptions } from "@textlint/kernel";
import type { TextstatRuleMeta, TextstatRuleReporter } from "./report-type.js";
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
