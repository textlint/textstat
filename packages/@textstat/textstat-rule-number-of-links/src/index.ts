// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleMeta, TextstatRuleReporter } from "@textstat/rule-context";

export const meta: TextstatRuleMeta = {
    docs: require("../package.json"),
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
export const report: TextstatRuleReporter = function(context) {
    const { Syntax, report } = context;
    const { t } = new Localize(meta.messages);
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
                data: [
                    {
                        name: t("Number of Links"),
                        value: count
                    }
                ]
            });
        }
    };
};
