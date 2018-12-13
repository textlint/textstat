import { TextlintResult } from "@textlint/kernel";

export interface TextstatMessage {
    // See src/shared/type/MessageType.js
    // Message Type
    type: string;
    // Rule Id
    ruleId: string;
    message: string;
    // optional data
    data: {
        message: string;
        range: [number, number];
        details: {
            name: string;
            value: any;
        };
    };
    // FixCommand is not defined in stat
    fix?: undefined;
    // location info
    // Text -> AST TxtNode(0-based columns) -> textlint -> TextlintMessage(**1-based columns**)
    line: number; // start with 1
    column: number; // start with 1
    // indexed-location
    index: number; // start with 0
    // Severity Level
    // See src/shared/type/SeverityLevel.js
    severity: number;
}

export interface TextstatResult extends TextlintResult {
    filePath: string;
    messages: TextstatMessage[];
}
