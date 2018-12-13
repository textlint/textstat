import * as React from "react";
import Plot from "react-plotly.js";

export interface FileSizeViewProps {
    results: {
        filePath: string;
        messages: {
            ruleId: string;
            data: {
                details: {
                    name: string;
                    value: number;
                }[];
            };
        }[];
    }[];
}

const ruleId = "textstat-rule-filesize";
const commonPathPrefix = require("common-path-prefix");
const trimCommonPrefix = (items: string[]): string[] => {
    const prefix: string = commonPathPrefix(items);
    return items.map(item => item.replace(prefix, "").replace(/\/README.md$/, ""));
};

export function FileSizeView(props: FileSizeViewProps) {
    const labels = trimCommonPrefix(
        props.results.map(result => {
            return result.filePath;
        })
    );
    const values: number[] = [];
    props.results.forEach(result => {
        return result.messages.forEach(message => {
            if (message.ruleId !== ruleId) {
                return;
            }
            message.data.details.forEach(detail => {
                values.push(detail.value);
            });
        });
    });
    return (
        <Plot
            data={[
                {
                    x: values.reverse(),
                    y: labels.reverse(),
                    orientation: "h",
                    type: "bar",
                    hoverinfo: "x",
                    marker: {
                        color: "rgb(158,202,225)",
                        opacity: 0.6,
                        line: {
                            color: "rgb(8,48,107)",
                            width: 1.5
                        }
                    }
                }
            ]}
            useResizeHandler={true}
            style={{
                width: "100%",
                height: "100%"
            }}
            layout={{
                title: ruleId,
                yaxis: {
                    tickmode: "linear",
                    ticks: "outside",
                    ticklen: 8,
                    automargin: true
                }
            }}
        />
    );
}
