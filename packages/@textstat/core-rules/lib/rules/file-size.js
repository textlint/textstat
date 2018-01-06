// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var fileSize = require("filesize");
var report = function(context) {
    var Syntax = context.Syntax,
        getFilePath = context.getFilePath,
        report = context.report;
    return (
        (_a = {}),
        (_a[Syntax.Document] = function(node) {
            var filePath = getFilePath();
            if (!filePath) {
                return;
            }
            var stats = fs.statSync(filePath);
            var fileSizeInBytes = stats["size"];
            report(node, {
                message: "File size in the document",
                data: {
                    "File Size": fileSize(fileSizeInBytes)
                }
            });
        }),
        _a
    );
    var _a;
};
exports.default = report;
//# sourceMappingURL=file-size.js.map
