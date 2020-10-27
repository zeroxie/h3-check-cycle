const yargs = require("yargs")
const pkg = require("../package.json")

const cc = require("../src/lib/index")

module.exports = function() {
    let argv = yargs.argv;
    yargs
        .alias('w', 'warning')
        .alias('d', 'danger')
        .alias('s', 'show')
    /**
     * 圈代码复杂度
     */
    yargs.command("sr", "", {}, cc)
    /**
     * 版本
     */
    yargs.command("version", "", {}, () => {
        console.log(pkg.version)
    })
    yargs.argv
}

