const meow = require("meow");
const run = require("../lib/src/cli").run;

const cli = meow(
    `
    Usage
      $ textstat <input>
 
    Options
      --locale specify locale string like "en"
  
    Examples
      $ textstat /path/to/README.md
      $ textstat "./**/*.md"
`,
    {
        flags: {
            locale: {
                type: "string"
            }
        },
        autoHelp: true,
        autoVersion: true
    }
);

if (cli.input.length === 0) {
    cli.showHelp();
}
run({
    globPatterns: cli.input,
    locale: cli.flags.locale
}).catch(error => {
    console.error(error);
    process.exit(1);
});
