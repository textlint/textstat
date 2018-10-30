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
        [Syntax.Image]() {
            count++;
        },
        [Syntax.Document + ":exit"](node) {
            report(node, {
                message: "Number of images in the document",
                details: [
                    {
                        name: "Number of images",
                        value: count
                    }
                ]
            });
        }
    };
};
export default report;
