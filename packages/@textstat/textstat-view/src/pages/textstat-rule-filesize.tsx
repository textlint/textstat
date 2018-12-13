// pages/reference.js
import * as React from "react";
import { StatContext } from "../context/StatContext";
import { FileSizeView } from "../components/FileSizeView/FileSizeView";

export default function TextstatRuleFileSize() {
    return <StatContext.Consumer>{({ results }) => <FileSizeView results={results} />}</StatContext.Consumer>;
}
