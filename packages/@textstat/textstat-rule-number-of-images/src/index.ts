// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleReporter } from "@textstat/rule-context";

export const meta = {
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
export const report: TextstatRuleReporter = function(context, _options, deps) {
    const { Syntax, report } = context;
    const { t } = new Localize(meta.messages, deps.locale);
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
