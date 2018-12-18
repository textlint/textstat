import * as assert from "assert";
import { toNonCyclic } from "../src/to-non-cyclic";

describe("to-non-cyclic", function() {
    it("should convert node list", () => {
        // A -> B -> C -> A
        // to be
        // A -> B -> C -> A'
        const nodes = [
            {
                source: "A",
                target: "B"
            },
            {
                source: "B",
                target: "C"
            },
            {
                source: "C",
                target: "A"
            }
        ];
        const expectedNodes = [
            {
                source: "A",
                target: "B"
            },
            {
                source: "B",
                target: "C"
            },
            {
                source: "C",
                target: "A[Cyclic]*"
            }
        ];
        const actualNodes = toNonCyclic(nodes);
        assert.deepStrictEqual(actualNodes, expectedNodes);
    });
    it("should convert node list", () => {
        // A -> B -> C -> A
        // to be
        // A -> B -> C -> A'
        const nodes = [
            {
                source: "A",
                target: "B"
            },
            {
                source: "C",
                target: "A"
            },
            {
                source: "B",
                target: "C"
            }
        ];
        const expectedNodes = [
            {
                source: "A",
                target: "B"
            },
            {
                source: "C",
                target: "A[Cyclic]*"
            },
            {
                source: "B",
                target: "C"
            }
        ];
        const actualNodes = toNonCyclic(nodes);
        assert.deepStrictEqual(actualNodes, expectedNodes);
    });
    it("should convert node list", () => {
        // A -> B -> C -> A
        // to be
        // A -> B -> C -> A'
        const nodes = [
            {
                source: "A",
                target: "B"
            },
            {
                source: "B",
                target: "C"
            },
            {
                source: "C",
                target: "A"
            },
            {
                source: "C",
                target: "D"
            }
        ];
        const expectedNodes = [
            {
                source: "A",
                target: "B"
            },
            {
                source: "B",
                target: "C"
            },
            {
                source: "C",
                target: "A[Cyclic]*"
            },
            {
                source: "C",
                target: "D"
            }
        ];
        const actualNodes = toNonCyclic(nodes);
        assert.deepStrictEqual(actualNodes, expectedNodes);
    });

    it("should convert node list", () => {
        // A -> B -> C -> A
        // to be
        // A -> B -> C -> A'
        const nodes = [
            {
                source: "A",
                target: "B"
            },
            {
                source: "B",
                target: "C"
            },
            {
                source: "C",
                target: "A"
            },
            {
                source: "C",
                target: "D"
            },
            {
                source: "C",
                target: "A"
            }
        ];
        const expectedNodes = [
            {
                source: "A",
                target: "B"
            },
            {
                source: "B",
                target: "C"
            },
            {
                source: "C",
                target: "A[Cyclic]*"
            },
            {
                source: "C",
                target: "D"
            },
            {
                source: "C",
                target: "A[Cyclic]**"
            }
        ];
        const actualNodes = toNonCyclic(nodes);
        assert.deepStrictEqual(actualNodes, expectedNodes);
    });
    it("should convert node list", () => {
        // A -> B -> C -> A
        // to be
        // A -> B -> C -> A'
        const nodes = [
            {
                source: "A",
                target: "C"
            },
            {
                source: "B",
                target: "C"
            },
            {
                source: "C",
                target: "D"
            },
            {
                source: "D",
                target: "C"
            }
        ];
        const expectedNodes = [
            {
                source: "A",
                target: "C"
            },
            {
                source: "B",
                target: "C"
            },
            {
                source: "D",
                target: "C"
            }
        ];
        const actualNodes = toNonCyclic(nodes);
        assert.deepStrictEqual(actualNodes, expectedNodes);
    });
    it("example test", () => {
        const nodes = require("./fixtures/input.json");
        const expectedNodes = require("./fixtures/output.json");
        const actualNodes = toNonCyclic(nodes);
        assert.deepStrictEqual(actualNodes, expectedNodes);
    });
});
