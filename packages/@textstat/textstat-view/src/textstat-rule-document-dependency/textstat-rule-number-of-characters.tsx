// pages/reference.js
import * as React from "react";
import { StatContext } from "../context/StatContext";
import { NumberOfCharactersView } from "../components/NumberOfCharactersView/NumberOfCharactersView";

export default function TextstatRuleNumberOfCharacters() {
    return <StatContext.Consumer>{({ results }) => <NumberOfCharactersView results={results} />}</StatContext.Consumer>;
}
