import traverse from "traverse";

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
type FLink = { id: string; source: string | null; target: string; value: 1 };

const ruleId = "textstat-rule-document-dependency";

const arrayToTree = <T extends { source: string | null; target: string }>(array: T[]) => {
    const tree: T[] = [];
    const childrenOf = new Map();
    array.forEach((obj: any) => {
        const { target: id, source: parentId } = obj;
        childrenOf.set(id, childrenOf.get(id) || []);
        const copyObj = { ...obj, children: childrenOf.get(id) };
        if (parentId) {
            childrenOf.set(parentId, childrenOf.get(parentId) || []);
            childrenOf.get(parentId).push(copyObj);
        } else {
            tree.push(copyObj);
        }
    });
    return tree;
};

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
    const commonPrefix = commonPathPrefix(nodeIds);
    const nodes: Node[] = nodeIds.map(nodeId => {
        return {
            id: nodeId,
            name: nodeId.replace(commonPrefix, "").replace("/README.md", "")
        };
    });
    const idToIndex = (id: string) => {
        return nodes.findIndex(node => node.id === id);
    };
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

    const nonCircularityLinksWithReferNull = nonCircularityLinks.map(
        (link): FLink => {
            const hasReferLink = nonCircularityLinks.some(forwardLink => {
                return link.source === forwardLink.target;
            });
            if (!hasReferLink) {
                return {
                    ...link,
                    id: link.source,
                    source: null
                };
            }
            return {
                ...link,
                id: link.source
            };
        }
    );

    function createRelationMap(list: FLink[]) {
        const map = new Map<string, string[]>();
        list.forEach(link => {
            const relation = map.get(link.id) || [];
            relation.push(link.target);
            map.set(link.id, relation);
        });
        return map;
    }

    function findForward(relationMap: Map<string, string[]>, id: string) {
        const relation = relationMap.get(id);
        if (!relation) {
            return;
        }
        return relation.find(targetId => {
            return findForward(relationMap, targetId);
        });
    }

    const relationMap = createRelationMap(nonCircularityLinksWithReferNull);
    nonCircularityLinksWithReferNull.forEach(link => {});

    return {
        nodes,
        source: [],
        target: [],
        value: []
    };
}
