/**
 * 数据库执行js
 */
const mysql = require('mysql')
// 数据库配置信息
const config = require('../../config/db_config').db.product
// sql链接池
const pool = mysql.createPool(config)

// 执行sql
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        // 执行sql
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          // 释放链接
          connection.release()
        })
      }
    })
  })
}

module.exports = query