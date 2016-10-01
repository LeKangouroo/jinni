var yargs = require("yargs");

// adds usage
yargs = yargs
    .locale("en")
    .usage("Usage: $0 <command> [options]")
    .command("build", "Builds distributable sources.")
    .command("clean", "Removes builds according to the mode (see --mode option)")
    .command("dev", "Launches development environment.")
    .demand(1)
    .help("h")
    .alias("h", "help")
    .describe("env", "Sets current environment. Available\240values:\n\t-\240development\n\t-\240pre-production\n\t-\240production")
    .describe("mode", "Sets task mode. Available\240values:\n\t-\240development\n\t-\240distributable")
    .nargs("mode", 1);

// sets default values
yargs = yargs
    .default("env", "development")
    .default("mode", "development");

// exports command args
module.exports = yargs.argv;
