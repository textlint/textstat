import { toNonCyclic } from "@textstat/to-non-cyclic";

export interface DocumentDependencyViewProps {
    reverse?: boolean;
    results: {
        filePath: string;
        messages: {
            ruleId: string;
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

const commonPathPrefix = require("common-path-prefix");

type Node = { id: string; name: string };
type Link = { source: string; target: string; value: 1 };

const ruleId = "textstat-rule-document-dependency";

export function generateGraphData(props: DocumentDependencyViewProps) {
    // https://qiita.com/natsuriver/items/a65b3c15165db561bcfa
    // https://github.com/plotly/plotly.js/blob/36d9fb4ad341510823e6e25cb9202867ac94a94a/src/traces/sankey/render.js
    // source and target is id
    const nodeIds: string[] = [];
    const links: Link[] = [];
    props.results.forEach(result => {
        const sourceId = result.filePath;
        if (!nodeIds.includes(sourceId)) {
            nodeIds.push(sourceId);
        }
        result.messages.forEach(message => {
            if (message.ruleId !== ruleId) {
                return;
            }
            message.data.details.forEach(detail => {
                const displayToLink = !props.reverse && detail.name === "To Links";
                const displayFromLink = props.reverse && detail.name === "From Links";
                if (!displayToLink && !displayFromLink) {
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
    const filteredLinks = toNonCyclic(links);
    const nodeIdList: string[] = [];
    filteredLinks.forEach(nonDupLink => {
        if (!nodeIdList.includes(nonDupLink.source)) {
            nodeIdList.push(nonDupLink.source);
        }
        if (!nodeIdList.includes(nonDupLink.target)) {
            nodeIdList.push(nonDupLink.target);
        }
    });
    const commonPrefix = commonPathPrefix(nodeIdList);
    const nodes: Node[] = nodeIdList.map(nodeId => {
        return {
            id: nodeId,
            name: nodeId.replace(commonPrefix, "").replace("/README.md", "")
        };
    });
    const idToIndex = (id: string) => {
        return nodes.findIndex(node => node.id === id);
    };
    return {
        nodes,
        source: filteredLinks.map(link => idToIndex(link.source)),
        target: filteredLinks.map(link => idToIndex(link.target)),
        value: filteredLinks.map(link => link.value)
    };
}
