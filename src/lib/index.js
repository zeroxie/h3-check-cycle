const cc = require("../index")
const chalk = require("chalk")
const { table } = require("table")
const { Spinner } = require("cli-spinner")
const ExportExcel = require("./export-data");

const M_TABLE_HEAD = ["类目", "数据"]
const TABLE_HEAD = ["函数名", "函数类型", "复杂度", "文件名", "位置", "重构建议"]

let spinner = new Spinner("")

const loading = (title = "加载中...") => {
    spinner.setSpinnerTitle(` 💫  ${title}  %s`)
    spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷")
    spinner.start()
}

const stop = () => {
    spinner.stop()
}

function fmtNumber(v) {
    let n = parseFloat(v)
    if (isNaN(n)) {
        return v
    } else {
        return `${(n * 100).toFixed(2)}%`
    }
}

module.exports = async function(param) {
    loading("正在执行代码复杂度检测...")
    const start = Date.now()
    const  { warning=10,danger=20} = param || {};
    const ccResult = await cc(param);
    stop()
    console.log(`检测完成,耗费${Date.now() - start}ms`)
    const { normalRatio, slightRatio, seriousRatio, fileCount, funcCount, result, score } = ccResult
    let mResultTable = [
        [`1 < 圈复杂度 <= ${warning}`, chalk.green(fmtNumber(normalRatio))],
        [`${warning} < 圈复杂度 <=${danger}`, chalk.green(fmtNumber(slightRatio))],
        [`${danger} < 圈复杂度 `, chalk.green(fmtNumber(seriousRatio))],
        ["文件数量", chalk.green(fileCount)],
        ["函数数量", chalk.green(funcCount)]
    ]
    mResultTable.unshift(M_TABLE_HEAD)
    let resultTable = result.map(e => [
        chalk.green(e.funcType),
        chalk.green(e.funcName),
        chalk.yellow(e.complexity),
        chalk.green(e.fileName),
        chalk.green(e.position),
        chalk.green(e.advice)
    ])
    resultTable.unshift(TABLE_HEAD);
    console.log(table(mResultTable));
    console.log(table(resultTable));

    let tableBody = result.map((e) => {
        return [e.funcType,e.funcName,e.complexity,e.fileName,e.position,e.advice]
    })
    let report = {
        header: TABLE_HEAD,
        body: tableBody
    }
    console.log(tableBody);
    ExportExcel(report)
}
