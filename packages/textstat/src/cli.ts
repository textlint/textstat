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
            return format(results, options.format);
        } else {
            return format(results, "json");
        }
    });
}
