import { splitAST, Syntax } from "sentence-splitter";
import { TxtParentNode } from "@textlint/ast-node-types";

export const getSentences = (node: TxtParentNode): import("sentence-splitter").SentenceNode[] => {
    return splitAST(node).children.filter(node => {
        return node.type === Syntax.Sentence;
    }) as import("sentence-splitter").SentenceNode[];
};
