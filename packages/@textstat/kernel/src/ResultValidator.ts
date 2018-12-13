import { TextstatMessage, TextstatResult } from "./type";

export const validateResult = (result: any): result is TextstatResult => {
    result.messages.forEach((message: TextstatMessage, index: number) => {
        if (!message.data) {
            throw new Error(`result[${index}].data is not defined.\n` + JSON.stringify(result, null, 4));
        }
        if (!Array.isArray(message.data.range)) {
            throw new Error(`result[${index}].data.range is not defined.\n` + JSON.stringify(result, null, 4));
        }
        if (!Array.isArray(message.data.details)) {
            throw new Error(`result[${index}].data.details is not defined\n` + JSON.stringify(result, null, 4));
        }
    });
    return true;
};
