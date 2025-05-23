import * as React from "react";
import { Result, StatContext } from "../context/StatContext";
import { DocumentDependencyView } from "../components/DocumentDependencyView/DocumentDependencyView";
import { useState } from "react";

type ResultFilterProps = {
    excludeFilePaths: string[];
    results: Result[];
    onChangeExcludeFilePath: (result: Result, excluded: boolean) => void;
};
const ResultFilter = ({ excludeFilePaths, results, onChangeExcludeFilePath }: ResultFilterProps) => {
    return (
        <div>
            <ul>
                {results.map(result => {
                    const isIncluded = !excludeFilePaths.includes(result.filePath);
                    return (
                        <li>
                            <input
                                checked={isIncluded}
                                onChange={() => {
                                    onChangeExcludeFilePath(result, !isIncluded);
                                }}
                            >
                                {result.filePath}
                            </input>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
const TextstatRuleDocumentDependency = () => {
    const [reverse, setReverse] = useState(false);
    const onChangeCheckbox = () => setReverse(r => !r);
    const [excludeFilePaths, setExcludeFilePaths] = React.useState<string[]>([]);
    const onChangeExcludeFilePath = (result: Result, excluded: boolean) => {
        setExcludeFilePaths(oldSet => {
            return excluded ? [...oldSet, result.filePath] : oldSet.filter(filepath => filepath !== result.filePath);
        });
    };
    return (
        <StatContext.Consumer>
            {({ results }) => {
                return (
                    <div style={{ width: "100%", height: "100%" }}>
                        <ResultFilter
                            results={results}
                            excludeFilePaths={excludeFilePaths}
                            onChangeExcludeFilePath={onChangeExcludeFilePath}
                        />
                        <input type="checkbox" id="dependency-reverse" checked={reverse} onChange={onChangeCheckbox} />
                        <label htmlFor="dependency-reverse">Reverse dependency flow?</label>
                        <DocumentDependencyView results={results} reverse={reverse} />
                    </div>
                );
            }}
        </StatContext.Consumer>
    );
};

export default function() {
    return <TextstatRuleDocumentDependency />;
}
