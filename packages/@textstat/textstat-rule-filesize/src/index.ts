// LICENSE : MIT
"use strict";
import * as fs from "fs";
import { Localize, TextstatRuleReporter } from "@textstat/rule-context";

// const fileSize = require("filesize");
export const meta = {
    docs: {},
    messages: {
        message: {
            en: "File size",
            ja: "ドキュメントのファイルサイズ"
        },
        "File size": {
            en: "File size",
            ja: "ファイルサイズ"
        }
    }
};

export const report: TextstatRuleReporter = function(context, _options, deps) {
    const { Syntax, getFilePath, report } = context;
    const { t } = new Localize(meta.messages, deps.locale);
    return {
        [Syntax.Document](node) {
            const filePath = getFilePath();
            if (!filePath) {
                return;
            }
            const stats = fs.statSync(filePath);
            const fileSizeInBytes = stats["size"];
            report(node, {
                message: t("message"),
                range: node.range,
                details: [
                    {
                        name: t("File size"),
                        value: fileSizeInBytes
                    }
                ]
            });
        }
    };
};
