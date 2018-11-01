// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleReporter } from "@textstat/rule-context";

export const meta = {
    docs: {
        description: "example rule",
        homepage: "https://github.com/textlint/textstat"
    },
    messages: {
        message: {
            en: "Number of characters of the document",
            ja: "ドキュメントの文字数"
        },
        "Number of characters": {
            en: "Number of characters",
            ja: "ドキュメントの文字数"
        }
    }
};

export const report: TextstatRuleReporter = function(context, _options, deps) {
    const { Syntax, report, getSource } = context;
    const { t } = new Localize(meta.messages, deps.locale);
    return {
        [Syntax.Document](node) {
            const text = getSource(node);
            report(node, {
                message: t("message"),
                range: node.range,
                details: [
                    {
                        name: t("Number of characters"),
                        value: text.length
                    }
                ]
            });
        }
    };
};
