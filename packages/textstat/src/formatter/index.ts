import { TextstatResult } from "@textstat/kernel";
import * as CSVFormatter from "./textstat-formatter-csv";
import * as JSONFormatter from "./textstat-formatter-json";

export type FormatterType = "csv" | "json";

export function format(results: TextstatResult[], type: FormatterType): string {
    switch (type) {
        case "csv":
            return CSVFormatter.format(results);
        case "json":
            return JSONFormatter.format(results);
        default:
            throw new Error(`Formatter type: ${type} is undefined`);
    }
}
