// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sentence_utils_1 = require("../util/sentence-utils");
var report = function(context) {
    var Syntax = context.Syntax,
        getSource = context.getSource,
        report = context.report;
    var count = 0;
    return (
        (_a = {}),
        (_a[Syntax.Document] = function() {
            count = 0;
        }),
        (_a[Syntax.Str] = function(node) {
            var text = getSource(node);
            var sentences = sentence_utils_1.getSentences(text);
            count += sentences.length;
        }),
        (_a[Syntax.Document + ":exit"] = function(node) {
            report(node, {
                "number of sentences": count
            });
        }),
        _a
    );
    var _a;
};
exports.default = report;
//# sourceMappingURL=number-of-sentences.js.map
