// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleReporter } from "@textstat/rule-context";

export const meta = {
    docs: require("../package.json"),
    messages: {
        message: {
            en: "Number of list items in the document",
            ja: "ドキュメント中の箇条書きの個数"
        },
        "Number of list items": {
            en: "Number of list items",
            ja: "箇条書きの個数"
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
        [Syntax.ListItem]() {
            count++;
        },
        [Syntax.Document + ":exit"](node) {
            report(node, {
                message: t("message"),
                details: [
                    {
                        name: t("Number of list items"),
                        value: count
                    }
                ]
            });
        }
    };
};
