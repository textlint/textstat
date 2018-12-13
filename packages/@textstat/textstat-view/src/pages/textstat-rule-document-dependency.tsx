// pages/reference.js
import * as React from "react";
import { DocumentDependencyView } from "../components/DocumentDependencyView/DocumentDependencyView";
import { StatContext } from "../context/StatContext";

export default function TextstatRuleDocumentDependency() {
    return (
        <StatContext.Consumer>
            {({ results }) => <DocumentDependencyView results={results} fromLink={false} />}
        </StatContext.Consumer>
    );
}
