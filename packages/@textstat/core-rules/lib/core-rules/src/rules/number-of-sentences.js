// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sentence_splitter_1 = require("sentence-splitter");
var report = function(context) {
    var Syntax = context.Syntax,
        report = context.report;
    var count = 0;
    return (
        (_a = {}),
        (_a[Syntax.Document] = function() {
            count = 0;
        }),
        (_a[Syntax.Paragraph] = function(node) {
            var sentences = sentence_splitter_1.splitAST(node).children.filter(function(node) {
                return node.type === sentence_splitter_1.Syntax.Sentence;
            });
            count += sentences.length;
        }),
        (_a[Syntax.Document + ":exit"] = function(node) {
            report(node, {
                message: "Number of sentences in the document",
                data: {
                    "number of sentences": count
                }
            });
        }),
        _a
    );
    var _a;
};
exports.default = report;
//# sourceMappingURL=number-of-sentences.js.map
