import { splitAST, Syntax } from "sentence-splitter";
import { TxtParentNode } from "@textlint/ast-node-types";
import { SentenceParentNode } from "sentence-splitter/src/sentence-splitter";

export const getSentences = (node: TxtParentNode): SentenceParentNode["children"] => {
    return splitAST(node).children.filter(node => {
        return node.type === Syntax.Sentence;
    });
};
