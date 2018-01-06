import { Textstat } from "../src/Textstat";
import * as path from "path";

describe("Textstat", () => {
    it("work", async () => {
        const textstat = new Textstat();
        const results = await textstat.report(path.join(__dirname, "../README.md"));
        console.log(JSON.stringify(results, null, 4));
    });
});
