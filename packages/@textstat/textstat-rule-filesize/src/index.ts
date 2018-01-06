// LICENSE : MIT
"use strict";
import * as fs from "fs";
import { TextstatRuleReporter } from "@textstat/rule-context";

const fileSize = require("filesize");
const report: TextstatRuleReporter = function(context) {
    let { Syntax, getFilePath, report } = context;
    return {
        [Syntax.Document](node) {
            const filePath = getFilePath();
            if (!filePath) {
                return;
            }
            const stats = fs.statSync(filePath);
            const fileSizeInBytes = stats["size"];
            report(node, {
                message: "File size in the document",
                range: node.range,
                details: {
                    "File Size": fileSize(fileSizeInBytes)
                }
            });
        }
    };
};
export default report;
