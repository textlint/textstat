// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleReporter } from "@textstat/rule-context";

export const meta = {
    docs: {},
    messages: {
        message: {
            en: "Number of links in the document",
            ja: "ドキュメント中のリンク数"
        },
        "Number of Links": {
            en: "Number of Links",
            ja: "リンク数"
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
        [Syntax.Link]() {
            count++;
        },
        [Syntax.Document + ":exit"](node) {
            report(node, {
                message: t("message"),
                details: [
                    {
                        name: t("Number of Links"),
                        value: count
                    }
                ]
            });
        }
    };
};
