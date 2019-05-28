const shell = require("shelljs");

exports.delRes = function() {
    shell.rm('-rf', '../res')
};
