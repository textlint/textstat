export interface LinkNode {
    source: string;
    target: string;
}

export function traverseLinkNodes<T extends LinkNode>(originLinkNode: T, targetLinkNodes: T[], nextLinkNode?: T) {
    const dupMap = new Map();
    targetLinkNodes.forEach(targetLinkNode => {
        if (targetLinkNode === nextLinkNode) {
            return;
        }
        if (targetLinkNode === originLinkNode) {
            return;
        }
        // ?'s target is origin's source
        if (nextLinkNode && nextLinkNode.target === targetLinkNode.source) {
            // Add [Cyclic] suffix to the target node
            if (originLinkNode.source === targetLinkNode.target) {
                const count = dupMap.get(originLinkNode.source) || 0;
                targetLinkNode.target = originLinkNode.source + "[Cyclic]" + "*".repeat(count + 1);
                dupMap.set(originLinkNode.source, count + 1);
                return;
            }
        }
        // Dig next
        // A -> B --> ?
        if (!nextLinkNode && originLinkNode.target === targetLinkNode.source) {
            // ? is origin node
            // we should modify the node name?
            return traverseLinkNodes(originLinkNode, targetLinkNodes, targetLinkNode);
        }
    });
}

/**
 * Convert link node list to non-cyclic node list
 * If the node is cyclic, Add "[Cyclic]*" suffix to node's target
 * @param linkNodes
 */
export function toNonCyclic<T extends LinkNode>(linkNodes: T[]): T[] {
    // remove cyclic close
    // A -> B, B -> A
    const flatLinkNodes = linkNodes.filter((linkNode, index) => {
        const forwardLinks = linkNodes.slice(index + 1);
        const circularLink = forwardLinks.filter(forwardLink => {
            return linkNode.source === forwardLink.target && linkNode.target === forwardLink.source;
        });
        return circularLink.length === 0;
    });
    flatLinkNodes.forEach(linkNode => {
        traverseLinkNodes(linkNode, flatLinkNodes);
    });
    return flatLinkNodes;
}
