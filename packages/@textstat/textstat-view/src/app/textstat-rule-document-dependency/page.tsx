"use client";

import * as React from "react";
import { Result, useStatValues } from "../../context/StatContext";
import { DocumentDependencyView } from "../../components/DocumentDependencyView/DocumentDependencyView";
import { useMemo, useState } from "react";

type ResultFilterProps = {
    excludeFilePaths: string[];
    results: Result[];
    onChangeExcludeFilePath: (result: Result, excluded: boolean) => void;
};
const ResultFilter = ({ excludeFilePaths, results, onChangeExcludeFilePath }: ResultFilterProps) => {
    const nonExcludedResults = results.filter(result => {
        return !excludeFilePaths.includes(result.filePath);
    });
    return (
        <div>
            <ul>
                {results.map(target => {
                    const isIncluded = !excludeFilePaths.includes(target.filePath);
                    // どこからか参照されているNodeは除外することができない
                    // detail.name === "To Links" && 自分へのリンクが一つでもあるなら、除外はできない
                    // out onlyだけのNOdeは除外できな
                    const ruleMessage = target.messages.filter(message => {
                        return message.ruleId === "textstat-rule-document-dependency";
                    });
                    const disabledCheckbox = ruleMessage.every(message => {
                        const hasToLinksCount = message.data.details.some(detail => {
                            return detail.name === "To Links" && detail.value.length > 0;
                        });
                        const hasFromLinksCount = message.data.details.some(detail => {
                            return detail.name === "From Links" && detail.value.length > 0;
                        });
                        return !hasToLinksCount && hasFromLinksCount;
                    });
                    return (
                        <li key={target.filePath}>
                            {" "}
                            {/* Add key prop for list items */}
                            <label>
                                {" "}
                                {/* Wrap input and text in a label for better accessibility */}
                                <input
                                    type="checkbox" // Add type="checkbox"
                                    checked={isIncluded}
                                    disabled={disabledCheckbox}
                                    onChange={() => {
                                        onChangeExcludeFilePath(target, isIncluded);
                                    }}
                                />
                                {target.filePath}
                            </label>
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
        console.log({
            excluded,
            result
        });
        setExcludeFilePaths(oldSet => {
            return excluded ? [...oldSet, result.filePath] : oldSet.filter(filepath => filepath !== result.filePath);
        });
    };
    const values = useStatValues();
    const results = values.results;
    const filteredResults = useMemo(() => {
        return results
            .filter(result => !excludeFilePaths.includes(result.filePath))
            .map(result => {
                const ruleMessage = result.messages.filter(message => {
                    return message.ruleId === "textstat-rule-document-dependency";
                });
                return {
                    ...result,
                    messages: result.messages.map(message => {
                        if (message.ruleId !== "textstat-rule-document-dependency") {
                            return message;
                        }
                        // detailsのデータから、toLink と from linkどちらからも除外する
                        return {
                            ...message,
                            data: {
                                ...message.data,
                                details: message.data.details.map(detail => {
                                    return {
                                        ...detail,
                                        values: detail.value.filter(value => {
                                            return !excludeFilePaths.includes(value.path);
                                        })
                                    };
                                })
                            }
                        };
                    })
                };
            });
    }, [results, excludeFilePaths]);
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <input type="checkbox" id="dependency-reverse" checked={reverse} onChange={onChangeCheckbox} />
            <label htmlFor="dependency-reverse">Reverse dependency flow?</label>
            <DocumentDependencyView results={filteredResults} reverse={reverse} />
            <ResultFilter
                results={results}
                excludeFilePaths={excludeFilePaths}
                onChangeExcludeFilePath={onChangeExcludeFilePath}
            />
            e
        </div>
    );
};

export default function Page() {
    // Changed function name to Page for Next.js convention
    return <TextstatRuleDocumentDependency />;
}
