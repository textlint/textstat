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
        [Syntax.ListItem]() {
            count++;
        },
        [Syntax.Document + ":exit"](node) {
            report(node, {
                message: "Number of list items in the document",
                details: [
                    {
                        name: "Number of list items",
                        value: count
                    }
                ]
            });
        }
    };
};
export default report;
