/**
 * 执行sql脚本入口
 */
const fs = require('fs');
const getSqlContentMap = require('../utils/db/get-sql-content');
const query = require('../utils/db/sql')

// 打印脚本执行日志
const eventLog = function( err , sqlFile, index ) {
  if( err ) {
    console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`)
  } else {
    console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`)
  }
}

// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap()

// 执行建表sql脚本
const createAllTables = async () => {
  for( let key in sqlContentMap ) {
    let sqlShell = sqlContentMap[key]
    // 分行运行
    let sqlShellList = sqlShell.split(';')

    for ( let [ i, shell ] of sqlShellList.entries() ) {
      if ( shell.trim() ) {
        // query( shell ).then((result) => {
        //   // 判断 key 下的文件 i 行是否执行成功
        //   if ( result.serverStatus * 1 === 2 ) {
        //     eventLog( null,  key, i)
        //   } else {
        //     eventLog( true,  key, i) 
        //   }
        // })
        let result = await query( shell )
        // 判断 key 下的文件 i 行是否执行成功
        if ( result.serverStatus * 1 === 2 ) {
          eventLog( null,  key, i)
        } else {
          eventLog( true,  key, i) 
        }
      }
    }
  }
  console.log('sql脚本执行结束！')
  console.log('请按 ctrl + c 键退出！')

}

module.exports = createAllTables
