"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("@textlint/kernel");
var textstat_rule_filesize_1 = require("@textstat/textstat-rule-filesize");
var fs = require("fs");
var path = require("path");
var markdown = require("textlint-plugin-markdown");
var Textstat = /** @class */ (function() {
    function Textstat() {}
    Textstat.prototype.report = function(filePath) {
        var kernel = new kernel_1.TextlintKernel();
        var text = fs.readFileSync(filePath, "utf-8");
        return kernel.lintText(text, {
            ext: path.extname(filePath),
            filePath: filePath,
            rules: [
                {
                    ruleId: "file-size",
                    rule: textstat_rule_filesize_1.default
                }
            ],
            plugins: [
                {
                    pluginId: "markdown",
                    plugin: markdown
                }
            ]
        });
    };
    return Textstat;
})();
exports.Textstat = Textstat;
//# sourceMappingURL=Textstat.js.map
