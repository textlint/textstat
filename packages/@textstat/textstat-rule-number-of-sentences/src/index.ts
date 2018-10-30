// LICENSE : MIT
"use strict";
import { TextstatRuleReporter } from "@textstat/rule-context";
import { splitAST, Syntax as SentenceSyntax } from "sentence-splitter";

const report: TextstatRuleReporter = function(context) {
    const { Syntax, report } = context;
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
                message: "Number of sentences in the document",
                details: [
                    {
                        name: "number of sentences",
                        value: count
                    }
                ]
            });
        }
    };
};
export default report;
