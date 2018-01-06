# textstat

textstat analyze text and summarize data.

textstat is related project of [textlint](https://github.com/textlint/textlint "textlint").

## Installation

    npm install @textstat/textstat

## Usage

- [ ] Write usage instructions

## UseCase

- Implement advice engine 
    - context-dependent
    - Paragraph Writing advice engine
- text mining
- Counting
    - Sentence
    - Paragraph
    - Word
    - Image
    - List
    - Code
    - Length


### 分類

Show result for each node

- Document
- Section
- Paragraph
- Sentence
- Word?

## その他

> 照応 省略 解析、

- 省略を発見する
- 文章のつながりの滑らかを評価する
- 範囲を強調表示する
- 関連付け

## Abstract

Process

- Map **Data** to **Range** of the **Document**.

View format

- Show **Data** of **Range** of the **Document**.

Output

- HTML(Popup data)
- Text(Group by **Range**)

## View Format

- https://crocro.com/pc/soft/novel_supporter/manual/doc-tool-warn_text.html
- range
- color
- underline
- displayName
- displayPosition: "after"

## Needs

- TxtAST to MDAST to HAST to HTML
- [syntax-tree/mdast-util-to-hast: Transform MDAST to HAST](https://github.com/syntax-tree/mdast-util-to-hast "syntax-tree/mdast-util-to-hast: Transform MDAST to HAST")
- [syntax-tree/hast-util-to-html: Transform HAST to HTML](https://github.com/syntax-tree/hast-util-to-html "syntax-tree/hast-util-to-html: Transform HAST to HTML")
- [render-markdown-with-position/markdown-to-html.js at master · azu/render-markdown-with-position](https://github.com/azu/render-markdown-with-position/blob/master/lib/markdown-to-html.js "render-markdown-with-position/markdown-to-html.js at master · azu/render-markdown-with-position")
- With AST point

## Development

    yarn install
    yarn bootstrap

## Tests

    yarn test

## Architecture

- Load `textstat-rule-*`
- Process text by [@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/%40textlint/kernel "@textlint/kernel")
- Format results
- Output statistics

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
