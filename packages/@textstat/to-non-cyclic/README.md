# @textstat/to-non-cyclic

Convert node list to non-cyclic node list.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textstat/to-non-cyclic

## Usage

```ts
import { toNonCyclic } from "@textstat/to-non-cyclic"
/**
 * Convert link node list to non-cyclic node list
 * If the node is cyclic, Add "[Cyclic]*" suffix to node's target
 * @param linkNodes
 */
export function toNonCyclic<T extends LinkNode>(linkNodes: T[]): T[];
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
