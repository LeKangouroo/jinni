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
    .describe("env", "Sets current environment. Available values:\n\t- development\n\t- pre-production\n\t- production")
    .describe("mode", "Sets task mode. Available values:\n\t- development\n\t- distributable")
    .nargs("mode", 1);

// sets default values
yargs = yargs
    .default("env", "development")
    .default("mode", "development");

// exports command args
module.exports = yargs.argv;
