import { generateGraphData } from "../generate";

describe("generateGraphData", function() {
    it("should convert data to graph", () => {
        const graphData = generateGraphData({
            reverse: false,
            results: require("./fixtures/data.json")
        });
    });
});
