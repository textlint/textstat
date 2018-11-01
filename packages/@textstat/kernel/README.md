# @textstat/textstat

textstat kernel.

This kernel module is same position with [@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/%40textlint/kernel).

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textstat/kernel

## Usage

```ts
const kernel = new TextstatKernel();
const result = await kernel.report(`# Header

This is example.
`, {
    rules: [{
        ruleId: "textstat-rule-example",
        rule: rule
    }],
    plugins: [{
        pluginId: "markdown",
        plugin: require("@textlint/textlint-plugin-markdown")
    }],
    filterRules: [],
    sharedDeps: {
        filePathList: ["/path/to/example.md", "/path/to/example.a.md"]
    },
    filePath: "/path/to/example.md",
    ext: ".md"
});
```

## Changelog

See [Releases page](https://github.com/textlint/textstat/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint/textstat/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
