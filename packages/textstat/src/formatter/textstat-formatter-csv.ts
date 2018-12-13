import uniq from "lodash.uniq";
import { Parser } from "json2csv";
import { TextstatResult } from "@textstat/kernel";

const commonPathPrefix = require("common-path-prefix");

export function collectDetails(result: TextstatResult, prefix: string) {
    const fieldNames: string[] = [];
    const unwindFields: string[] = [];
    const details: any[] = [];
    result.messages.forEach(message => {
        message.data.details.forEach(item => {
            fieldNames.push(item.name);
            if (Array.isArray(item.value)) {
                unwindFields.push(item.name);
            }
            details.push({
                filePath: result.filePath,
                displayPath: result.filePath.replace(prefix, ""),
                ruleId: message.ruleId,
                message: message.message,
                [item.name]: item.value
            });
        });
    });
    return {
        fieldNames,
        unwindFields,
        details
    };
}

export function format(results: TextstatResult[]) {
    let fieldNames: string[] = ["filePath", "displayPath", "ruleId", "message"];
    let unwindFields: string[] = [];
    let details: any[] = [];
    const allFilePathList = results.map(result => result.filePath);
    const prefix = commonPathPrefix(allFilePathList);
    results.forEach(result => {
        const info = collectDetails(result, prefix);
        fieldNames = uniq(fieldNames.concat(info.fieldNames));
        unwindFields = uniq(unwindFields.concat(info.unwindFields));
        details = details.concat(info.details);
    });
    const parser = new Parser({
        fields: fieldNames,
        unwind: unwindFields
    });
    return parser.parse(details);
}
