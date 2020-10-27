const fs = require("fs");
const xlsx = require("node-xlsx"); // 引入模块

module.exports = function(report) {
  // 导出excel
  ExportExcel(report);
};


/**
 * 导出excel文件记录每一次的记录
 * @param  report
 */
async function ExportExcel(report) {
  // 已经存在的数据
  let exsitData;
  // 写入excel的数据
  let data = [];
  // 列名
  title = report.header;

  await fs.exists("./report.xlsx", exists => {
    console.log(exists ? "存在" : "不存在");
    if (exists) {
      // 读取是否有已存在的文件内容
      const obj = xlsx.parse("./report.xlsx");
      exsitData = obj ? obj[0].data : null;
    }
    // 如果没有已经存在的数据就新建一个title，其实不用写，反正都是覆盖~
    if (!exsitData || !exists) {
      data.push(title);
    } else {
      data.push(title);
    }
    //data中添加的要是数组
    data.push(...report.body);

    let buffer = xlsx.build([
      {
        name: "sheet1",
        data: data
      }
    ]);
    // 输出excel
    fs.writeFileSync("./report.xlsx", buffer, { flag: "w" });
  });
}
