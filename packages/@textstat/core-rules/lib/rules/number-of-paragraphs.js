// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report = function(context) {
    var Syntax = context.Syntax,
        report = context.report;
    var count = 0;
    return (
        (_a = {}),
        (_a[Syntax.Document] = function() {
            count = 0;
        }),
        (_a[Syntax.Paragraph] = function() {
            count++;
        }),
        (_a[Syntax.Document + ":exit"] = function(node) {
            report(node, {
                message: "Number of paragraphs in the document",
                data: {
                    "Number of paragraphs": count
                }
            });
        }),
        _a
    );
    var _a;
};
exports.default = report;
//# sourceMappingURL=number-of-paragraphs.js.map
