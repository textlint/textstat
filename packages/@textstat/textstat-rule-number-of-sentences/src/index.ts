// LICENSE : MIT
"use strict";
import { Localize, TextstatRuleReporter } from "@textstat/rule-context";
import { splitAST, Syntax as SentenceSyntax } from "sentence-splitter";

export const meta = {
    docs: require("../package.json"),
    messages: {
        message: {
            en: "Number of sentences in the document",
            ja: "ドキュメント中のセンテンス数"
        },
        "Number of sentences": {
            en: "Number of sentences",
            ja: "センテンス数"
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
        [Syntax.Paragraph](node) {
            const sentences = splitAST(node as any).children.filter(node => {
                return node.type === SentenceSyntax.Sentence;
            });
            count += sentences.length;
        },
        [Syntax.Document + ":exit"](node) {
            report(node, {
                message: t("message"),
                details: [
                    {
                        name: t("Number of sentences"),
                        value: count
                    }
                ]
            });
        }
    };
};
