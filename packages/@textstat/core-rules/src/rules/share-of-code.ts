// LICENSE : MIT
"use strict";
import { TextstatRuleReporter } from "@textstat/rule-context";

const report: TextstatRuleReporter = function(context) {
    const { Syntax, getSource, report } = context;
    let code = "";
    return {
        [Syntax.Document]() {
            code = "";
        },
        [Syntax.CodeBlock](node) {
            code += getSource(node) || "";
        },
        [Syntax.Document + ":exit"](node) {
            const allText = getSource(node);
            if (!allText) {
                return;
            }
            const percent = Math.round(code.length / allText.length * 100);
            report(node, {
                message: "Share of code in the document",
                data: {
                    "Share of code": percent + "%"
                }
            });
        }
    };
};
export default report;
