import { run } from "../src/textstat";
import { TextlintResult } from "@textlint/kernel";
import * as fs from "fs";
//
import uniq from "lodash.uniq";
import { Parser } from "json2csv";

export function collectDetails(result: TextlintResult) {
    const fieldNames: string[] = [];
    const unwindFields: string[] = [];
    const details: any[] = [];
    result.messages.forEach(message => {
        message.data.details.forEach((item: { name: string; value: any }) => {
            fieldNames.push(item.name);
            if (Array.isArray(item.value)) {
                unwindFields.push(item.name);
            }
            details.push({
                filePath: result.filePath,
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

export function format(results: TextlintResult[]) {
    let fieldNames: string[] = ["filePath", "ruleId", "message"];
    let unwindFields: string[] = [];
    let details: any[] = [];
    results.forEach(result => {
        const info = collectDetails(result);
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

//
describe("run", function() {
    it("work", async () => {
        const results: any = await run("/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/**/*.md");
        fs.writeFileSync(__dirname + "/out.csv", format(results));
        // result.messages.forEach(message => {
        //     console.log(`${message.ruleId}:${message.message}`);
        //     const dataMessage = message.data.details.map((item: any) => {
        //         return `\t${item.name}:` +
        //             (Array.isArray(item.value)
        //                     ? JSON.stringify(item.value)
        //                     : item.value
        //             );
        //     }).join("\n");
        //     console.log(dataMessage);
        //     console.log("=========");
        // })
    });
});
