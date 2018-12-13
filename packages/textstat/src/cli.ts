import { report } from "./textstat";
import { format, FormatterType } from "./formatter";

const osLocale = require("os-locale");

export interface RunOptions {
    locale: string;
    format: FormatterType;
    globPatterns: string[];
}

export async function run(options: RunOptions) {
    const locale = options.locale ? options.locale : (osLocale.sync() as string);
    return report({
        locale,
        globPatterns: options.globPatterns
    }).then(results => {
        if (options.format) {
            const output = format(results, options.format);
            console.log(output);
        } else {
            const output = format(results, "json");
            console.log(output);
        }
    });
}
