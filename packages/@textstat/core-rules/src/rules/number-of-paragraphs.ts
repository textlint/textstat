// LICENSE : MIT
"use strict";
import { TextstatRuleReporter } from "@textstat/rule-context";

const report: TextstatRuleReporter = function(context) {
    const { Syntax, report } = context;
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
                message: "Number of paragraphs in the document",
                data: {
                    "Number of paragraphs": count
                }
            });
        }
    };
};
export default report;
