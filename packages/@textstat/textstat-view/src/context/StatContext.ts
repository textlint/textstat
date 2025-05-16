import { createContext } from "react";
import { getStore } from "./LocalStore";

export type Result = {
    filePath: string;
    messages: {
        ruleId: string;
        data: {
            details: {
                name: string;
                value: {
                    type: string;
                    path: string;
                }[];
            }[];
        };
    }[];
};
const defaultValue = {
    input: "",
    results: []
};
const defaultState = getStore(defaultValue);
export const StatContext = createContext(defaultState);
