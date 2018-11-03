// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleReporter } from "@textstat/rule-context";

export const meta = {
    docs: {},
    messages: {
        message: {
            en: "Number of paragraphs in the document",
            ja: "ドキュメント中のパラグラフ数"
        },
        "Number of paragraphs": {
            en: "Number of paragraphs",
            ja: "パラグラフ数"
        }
    }
};
export const report: TextstatRuleReporter = function(context, _options, deps) {
    const { Syntax, report } = context;
    const { t } = new Localize(meta.messages, deps.locale);
    let count = 0;
    return {
        [Syntax.Document]() {
            count = 0;
        },
        [Syntax.Paragraph]() {
            count++;
        },
        [Syntax.Document + ":exit"](node) {
            report(node, {
                message: t("message"),
                details: [
                    {
                        name: t("Number of paragraphs"),
                        value: count
                    }
                ]
            });
        }
    };
};
