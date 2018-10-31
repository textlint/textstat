// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleMeta, TextstatRuleReporter } from "@textstat/rule-context";

export const meta: TextstatRuleMeta = {
    docs: require("../package.json"),
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
export const report: TextstatRuleReporter = function(context) {
    const { Syntax, report } = context;
    const { t } = new Localize(meta.messages);
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
