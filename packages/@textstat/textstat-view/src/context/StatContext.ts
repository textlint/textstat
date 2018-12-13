import { createContext } from "react";
import { getStore } from "./LocalStore";

const defaultValue = {
    input: "",
    results: []
};
const defaultState = getStore(defaultValue);
export const StatContext = createContext(defaultState);
