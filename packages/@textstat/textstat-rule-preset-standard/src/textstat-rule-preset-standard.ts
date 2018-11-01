export function createPreset(_options = {}) {
    return {
        rules: {
            "textstat-rule-filesize": require("@textstat/textstat-rule-filesize"),
            "textstat-rule-document-dependency": require("@textstat/textstat-rule-document-dependency"),
            "textstat-rule-number-of-characters": require("@textstat/textstat-rule-number-of-characters"),
            "textstat-rule-number-of-images": require("@textstat/textstat-rule-number-of-images"),
            "textstat-rule-number-of-links": require("@textstat/textstat-rule-number-of-links"),
            "textstat-rule-number-of-list-items": require("@textstat/textstat-rule-number-of-list-items"),
            "textstat-rule-number-of-paragraphs": require("@textstat/textstat-rule-number-of-paragraphs"),
            "textstat-rule-number-of-sentences": require("@textstat/textstat-rule-number-of-sentences")
        },
        rulesConfig: {
            "textstat-rule-filesize": true,
            "textstat-rule-document-dependency": true,
            "textstat-rule-number-of-characters": true,
            "textstat-rule-number-of-images": true,
            "textstat-rule-number-of-links": true,
            "textstat-rule-number-of-list-items": true,
            "textstat-rule-number-of-paragraphs": true,
            "textstat-rule-number-of-sentences": true
        }
    };
}
