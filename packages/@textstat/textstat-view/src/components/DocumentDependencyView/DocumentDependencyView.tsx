import React from "react";
import Plot from "react-plotly.js";

const commonPathPrefix = require("common-path-prefix");

export interface DocumentDependencyViewProps {
    fromLink?: boolean;
    results: {
        filePath: string;
        messages: {
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
    }[];
}

type Node = { id: string; name: string };
type Link = { source: string; target: string; value: 1 };

export function DocumentDependencyView(props: DocumentDependencyViewProps) {
    const nodeIds: string[] = [];
    // https://qiita.com/natsuriver/items/a65b3c15165db561bcfa
    // https://github.com/plotly/plotly.js/blob/36d9fb4ad341510823e6e25cb9202867ac94a94a/src/traces/sankey/render.js
    // source and target is id
    const links: Link[] = [];
    const idToIndex = (id: string) => {
        return nodeIds.findIndex(nodeId => nodeId === id);
    };
    props.results.forEach(result => {
        const sourceId = result.filePath;
        if (!nodeIds.includes(sourceId)) {
            nodeIds.push(sourceId);
        }
        result.messages.forEach(message => {
            message.data.details.forEach(detail => {
                if (props.fromLink && detail.name !== "To Links") {
                    return;
                }
                if (!props.fromLink && detail.name !== "From Links") {
                    return;
                }
                detail.value.forEach(value => {
                    if (value.type !== "document") {
                        return;
                    }
                    links.push({
                        source: sourceId,
                        target: value.path,
                        value: 1
                    });
                });
            });
        });
    });
    const commonPrefix = commonPathPrefix(nodeIds);
    const nodes: Node[] = nodeIds.map(nodeId => {
        return {
            id: nodeId,
            name: nodeId.replace(commonPrefix, "").replace("/README.md", "")
        };
    });
    const nonCircularityLinks: Link[] = links
        .filter((link, index) => {
            const forwardLinks = links.slice(index + 1);
            const circularLink = forwardLinks.filter(forwardLink => {
                return link.source === forwardLink.target && link.target === forwardLink.source;
            });
            return circularLink.length === 0;
        })
        .filter(link => {
            return idToIndex(link.source) !== -1 && idToIndex(link.target) !== -1;
        });
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
            source: nonCircularityLinks.map(link => idToIndex(link.source)),
            target: nonCircularityLinks.map(link => idToIndex(link.target)),
            value: nonCircularityLinks.map(link => link.value)
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
