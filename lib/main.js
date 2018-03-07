(function(){
    var commander = require('commander'),
    version = require('../package.json').version,
    reader  = require('./reader.js');

    // Register options
    commander.version(version).option("-p, --path [path]", "Path to data file");
    commander.on("—help", function() {
        console.log(" Examples:");
        console.log("");
        console.log(" $ " + "entry" + " —message hello");
      });

    // parse console input
    commander.parse(process.argv);

    // Check for Help options
    if (process.argv.length === 2) {
        commander.help();
      } else {
        try {
          reader.print({
            path: commander.path
          });
        } catch (_error) {
          err = _error;
          console.log(err.message);
        }
    }

}).call(this)