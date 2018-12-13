import { report } from "../src/textstat";
import { TextlintResult } from "@textlint/kernel";
import * as fs from "fs";
//
import uniq from "lodash.uniq";
import { Parser } from "json2csv";

const commonPathPrefix = require("common-path-prefix");

export function collectDetails(result: TextlintResult, prefix: string) {
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

export function format(results: TextlintResult[]) {
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

//
describe("run", function() {
    it("work", async () => {
        // TODO: hardcode
        const filePathList = [
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/index.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/intro/goal/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/intro/feedback/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/introduction/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/comments/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/variables/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/read-eval-print/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/data-type/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/function-declaration/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/statement-expression/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/condition/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/loop/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/operator/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/implicit-coercion/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/object/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/array/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/string/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/math/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/wrapper-object/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/function-scope/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/function-this/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/class/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/error-try-catch/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/async/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/json/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/date/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/map-and-set/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/bad-parts/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/ecmascript/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/basic/other-parts/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/setup-local-env/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/module/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/ajaxapp/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/ajaxapp/entrypoint/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/ajaxapp/xhr/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/ajaxapp/display/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/ajaxapp/promise/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/nodecli/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/nodecli/helloworld/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/nodecli/argument-parse/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/nodecli/read-file/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/nodecli/md-to-html/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/nodecli/refactor-and-unittest/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/todoapp/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/todoapp/entrypoint/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/todoapp/app-structure/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/todoapp/form-event/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/todoapp/event-model/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/todoapp/update-delete/README.md",
            "/Users/azu/.ghq/github.com/asciidwango/js-primer/source/use-case/todoapp/final/README.md"
        ];
        const results: any = await report({
            globPatterns: filePathList
        });
        fs.writeFileSync(__dirname + "/out.json", JSON.stringify(results));
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
