import { splitAST, Syntax } from "sentence-splitter";
import { TxtParentNode } from "@textlint/ast-node-types";

export const getSentences = (node: TxtParentNode) => {
    return splitAST(node).children.filter(node => {
        return node.type === Syntax.Sentence;
    });
};
