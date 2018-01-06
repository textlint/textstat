// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report = function(context) {
    var Syntax = context.Syntax,
        getSource = context.getSource,
        report = context.report;
    return (
        (_a = {}),
        (_a[Syntax.Document] = function(node) {
            var text = getSource(node);
            if (!text) {
                return;
            }
            var lines = text.split("\n");
            report(node, {
                message: "Number of lines in the document",
                data: {
                    "Number of lines": lines.length
                }
            });
        }),
        _a
    );
    var _a;
};
exports.default = report;
//# sourceMappingURL=number-of-lines.js.map
