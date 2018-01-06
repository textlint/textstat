// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report = function(context) {
    var Syntax = context.Syntax,
        getSource = context.getSource,
        report = context.report;
    var code = "";
    return (
        (_a = {}),
        (_a[Syntax.Document] = function() {
            code = "";
        }),
        (_a[Syntax.CodeBlock] = function(node) {
            code += getSource(node) || "";
        }),
        (_a[Syntax.Document + ":exit"] = function(node) {
            var allText = getSource(node);
            if (!allText) {
                return;
            }
            var percent = Math.round(code.length / allText.length * 100);
            report(node, {
                message: "Share of code in the document",
                data: {
                    "Share of code": percent + "%"
                }
            });
        }),
        _a
    );
    var _a;
};
exports.default = report;
//# sourceMappingURL=share-of-code.js.map
