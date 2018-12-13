import * as assert from "assert";
import { Localize } from "../src";

const messages = {
    simple: {
        en: "message",
        ja: "メッセージ"
    },
    template: "index is {{index}}"
};
describe("Localize", function() {
    it("should return en message by default", () => {
        const { t } = new Localize(messages);
        assert.strictEqual(t("simple"), messages.simple.en);
    });
    it("should return ja message for ja-JP", () => {
        const { t } = new Localize(messages, "ja-JP");
        assert.strictEqual(t("simple"), messages.simple.ja);
    });
    it("should return js message by locale option", () => {
        const { t } = new Localize(messages, "ja");
        assert.strictEqual(t("simple"), messages.simple.ja);
    });
    it("should return template message ", () => {
        const { t } = new Localize(messages);
        assert.strictEqual(
            t("template", {
                index: 10
            }),
            `index is 10`
        );
    });
});
