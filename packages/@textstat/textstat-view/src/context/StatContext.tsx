import { createContext, ReactNode, useContext } from "react";
import { getStore } from "./LocalStore";
import * as React from "react";

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
    results: [] as Result[] // resultsの型をResult[]に指定
};
export type StatProps = {
    input: string;
    results: Result[];
};
const defaultState = getStore<StatProps>(defaultValue);
const StatContext = createContext<StatProps>(defaultState);
export const StatProvider = ({
    children,
    value
}: {
    value: {
        input: string;
        results: Result[];
    };
    children: ReactNode;
}) => {
    return <StatContext.Provider value={value}>{children}</StatContext.Provider>;
};
export const useStatValues = (): StatProps => {
    const context = useContext(StatContext);
    if (!context) {
        throw new Error("Should be in Provider");
    }
    return context;
};
