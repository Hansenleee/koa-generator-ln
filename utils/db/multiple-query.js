/**
 * 数据库执行js
 */
const mysql = require('mysql')
// 数据库配置信息
const config = require('../../config/db_config').db.product

let multipleQuery = (sql, values) => {
  return new Promise((resolve, reject) => {

    const connection =  mysql.createConnection(Object.assign({}, config, {
      multipleStatements: true,
    }));

    connection.query(sql, values, ( err, rows) => {

      if ( err ) {
        reject( err )
      } else {
        resolve( rows )
      }
    })
    // 释放链接
    connection.end();
  })
}

module.exports = multipleQuery