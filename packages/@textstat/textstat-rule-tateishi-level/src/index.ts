import { Localize, TextstatRuleReporter } from "@textstat/rule-context";
import { elevateTateishi } from "./tateishi";
import { getSentences } from "./sentence-util";
import { TxtParentNode } from "@textlint/ast-node-types";

const { RuleHelper } = require("textlint-rule-helper");

function calcCP({ dokutenCount, kutenCount }: { dokutenCount: number; kutenCount: number }) {
    if (kutenCount === 0 || dokutenCount === 0) {
        return 0;
    }
    var number = dokutenCount / kutenCount;
    if (isNaN(number)) {
        return 0;
    }
    return number;
}

function average(numbers: number[]) {
    if (numbers.length === 0) {
        return 0;
    }
    let total = numbers.reduce((value: number, current: number) => {
        return value + current;
    }, 0);
    return total / numbers.length;
}

export const meta = {
    docs: {},
    messages: {
        message: "読みやすさの偏差値",
        偏差値: "偏差値(平均50、標準偏差10、高いほど読みやすい)"
    }
};
export const report: TextstatRuleReporter = function(context, _options, deps) {
    const { Syntax, getSource, report } = context;
    const { t } = new Localize(meta.messages, deps.locale);
    let kutenCount = 0;
    let dokutenCount = 0;
    let results: {
        sentence: number[];
        alphabet: number[];
        hiragana: number[];
        kanji: number[];
        katakana: number[];
    } = {
        sentence: [],
        alphabet: [],
        hiragana: [],
        kanji: [],
        katakana: []
    };
    let helper = new RuleHelper(context);
    return {
        [Syntax.Document]() {
            kutenCount = 0;
            dokutenCount = 0;
            results = {
                sentence: [],
                alphabet: [],
                hiragana: [],
                kanji: [],
                katakana: []
            };
        },
        [Syntax.Paragraph](node) {
            if (helper.isChildNode(node, [Syntax.BlockQuote])) {
                return;
            }
            const text = getSource(node);
            // node should be ParentNode, but it is TxtNode
            // See https://github.com/textlint/textlint/issues/553
            const sentences = getSentences(node as TxtParentNode);
            // 1文の長さ
            sentences.forEach(sentence => {
                results.sentence.push(sentence.raw.length);
            });
            // それぞれのカウント
            const HIRAKANGA_INDEX = 0;
            const KATANAGA_INDEX = 1;
            const KANJI_INDEX = 2;
            const ALPHABET_INDEX = 3;
            let counter = [
                0, // hiragana
                0, // KATANAGA
                0, // KANJI
                0 //  ALPHABET
            ];

            function resetCount() {
                counter.forEach((count, index) => {
                    if (count !== 0) {
                        if (index === HIRAKANGA_INDEX) {
                            results.hiragana.push(count);
                        } else if (index === KANJI_INDEX) {
                            results.kanji.push(count);
                        } else if (index === KATANAGA_INDEX) {
                            results.katakana.push(count);
                        } else if (index === ALPHABET_INDEX) {
                            results.alphabet.push(count);
                        }
                    }
                    // reset counter
                    counter[index] = 0;
                });
            }

            //
            let lastHitType: null | number = null;
            const countUp = (type: number) => {
                if (type !== lastHitType) {
                    resetCount();
                }
                counter[type]++;
                lastHitType = type;
                for (let i = 0; i < text.length; i++) {
                    let char = text[i];
                    // 句点あたりの読点の数
                    if (char === "。") {
                        kutenCount++;
                    } else if (char === "、") {
                        dokutenCount++;
                    }
                    // 連での文字の長さ
                    if (/[ぁ-ん]/.test(char)) {
                        countUp(HIRAKANGA_INDEX);
                    }
                    if (/[ァ-ヶ]/.test(char)) {
                        countUp(KATANAGA_INDEX);
                    }
                    if (/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]/.test(char)) {
                        countUp(KANJI_INDEX);
                    }
                    if (/[\w\s]/.test(char)) {
                        countUp(ALPHABET_INDEX);
                    }
                }
                // last resetCount
                resetCount();
            };
        },
        [`${Syntax.Document}:exit`](node) {
            let result = elevateTateishi({
                sentence: average(results.sentence),
                alphabet: average(results.alphabet),
                hiragana: average(results.hiragana),
                kanji: average(results.kanji),
                katakana: average(results.katakana),
                cp: calcCP({ dokutenCount, kutenCount })
            });
            report(node, {
                message: t("message"),
                details: [
                    {
                        name: t("偏差値"),
                        value: Math.round(result * 10) / 10
                    }
                ]
            });
        }
    };
};
