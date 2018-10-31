// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleMeta, TextstatRuleReporter } from "@textstat/rule-context";

export const meta: TextstatRuleMeta = {
    docs: require("../package.json"),
    messages: {
        message: {
            en: "Number of images in the document",
            ja: "ドキュメント中の画像数"
        },
        "Number of images": {
            en: "Number of images",
            ja: "画像数"
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
        [Syntax.Image]() {
            count++;
        },
        [Syntax.Document + ":exit"](node) {
            report(node, {
                message: t("message"),
                details: [
                    {
                        name: t("Number of images"),
                        value: count
                    }
                ]
            });
        }
    };
};
