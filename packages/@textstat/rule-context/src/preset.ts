import { TextstatKernelRule } from "../lib/src";
import { TextlintRuleOptions } from "@textlint/kernel";
/**
 * Textstat Rule preset
 */
export type TextstatRulePreset = {
    rules: { [index: string]: TextstatKernelRule };
    rulesConfig: { [index: string]: TextlintRuleOptions | boolean };
};

export type TextstatRulePresetFactory = {
    // TODO: support option
    createPreset: () => TextstatRulePreset;
};

export function isTextstatRulePresetFactory(v: any): v is TextstatRulePresetFactory {
    return typeof v === "object" && v.createPreset === "function";
}
