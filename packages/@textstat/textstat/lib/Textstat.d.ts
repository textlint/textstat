import { TextlintResult } from "@textlint/kernel";
export declare class Textstat {
    report(filePath: string): Promise<TextlintResult>;
}
