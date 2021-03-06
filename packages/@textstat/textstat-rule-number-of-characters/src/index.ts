// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleReporter } from "@textstat/rule-context";

export const meta = {
    docs: {},
    messages: {
        message: {
            en: "Number of characters in the document",
            ja: "ドキュメント中の文字数"
        },
        "Number of characters": {
            en: "Number of characters",
            ja: "文字数"
        }
    }
};
export const report: TextstatRuleReporter = function(context, _options, deps) {
    const { Syntax, getSource, report } = context;
    const { t } = new Localize(meta.messages, deps.locale);
    return {
        [Syntax.Document](node) {
            const text = getSource(node);
            if (!text) {
                return;
            }
            const charactersCount = text.length;
            report(node, {
                message: t("message"),
                range: node.range,
                details: [
                    {
                        name: t("Number of characters"),
                        value: charactersCount
                    }
                ]
            });
        }
    };
};
