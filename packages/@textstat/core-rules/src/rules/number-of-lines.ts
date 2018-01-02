// LICENSE : MIT
"use strict";
import { TextstatRuleReporter } from "@textstat/rule-context";

const report: TextstatRuleReporter = function(context) {
    const { Syntax, getSource, report } = context;
    return {
        [Syntax.Document](node) {
            const text = getSource(node);
            if (!text) {
                return;
            }
            const lines = text.split("\n");
            report(node, {
                message: "Number of lines in the document",
                data: {
                    "Number of lines": lines.length
                }
            });
        }
    };
};
export default report;
