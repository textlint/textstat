// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNotEmpty(text) {
    if (!text) {
        return false;
    }
    return text.trim().length > 0;
}
function getSentences(text) {
    var results = [];
    var sentences = text.split("\n\n");
    sentences.forEach(function(sentence) {
        sentence.split(/[.。]+/).forEach(function(sen) {
            results.push(sen);
        });
    });
    return results.filter(isNotEmpty);
}
exports.getSentences = getSentences;
//# sourceMappingURL=sentence-utils.js.map
