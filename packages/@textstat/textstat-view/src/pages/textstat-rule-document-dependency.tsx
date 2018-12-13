// pages/reference.js
import * as React from "react";
import { StatContext } from "../context/StatContext";
import { DocumentDependencyView } from "../components/DocumentDependencyView/DocumentDependencyView";

export default function TextstatRuleDocumentDependency() {
    return (
        <StatContext.Consumer>
            {({ results }) => <DocumentDependencyView results={results} fromLink={false} />}
        </StatContext.Consumer>
    );
}
