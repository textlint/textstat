import { TextstatResult } from "@textstat/kernel/lib/src";

export const format = (results: TextstatResult[]) => {
    return JSON.stringify(results);
};
