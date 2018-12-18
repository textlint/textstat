import React from "react";
import Plot from "react-plotly.js";
import { DocumentDependencyViewProps, generateGraphData } from "./generate";

export function DocumentDependencyView(props: DocumentDependencyViewProps) {
    const { nodes, source, target, value } = generateGraphData(props);
    const trace = {
        type: "sankey",
        orientation: "h",
        node: {
            pad: 10,
            thickness: 30,
            line: {
                color: "black",
                width: 4
            },
            label: nodes.map(node => node.name)
        },
        link: {
            source: source,
            target: target,
            value: value
        }
    };
    return (
        <Plot
            data={[trace as any]}
            useResizeHandler={true}
            style={{
                width: "100%",
                height: "100%"
            }}
            layout={{
                title: "Dependencies"
            }}
        />
    );
}
