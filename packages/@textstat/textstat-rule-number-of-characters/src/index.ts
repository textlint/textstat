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
            const charactersCount = text.length;
            report(node, {
                message: "Number of characters in the document.",
                range: node.range,
                details: [
                    {
                        name: "Number of characters",
                        value: charactersCount
                    }
                ]
            });
        }
    };
};
export default report;
