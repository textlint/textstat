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
        [Syntax.Link]() {
            count++;
        },
        [Syntax.Document + ":exit"](node) {
            report(node, {
                message: "Number of links in the document",
                data: {
                    "number of Links": count
                }
            });
        }
    };
};
export default report;
