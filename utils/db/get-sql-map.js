/**
 * 获取common/sql下的.sql脚本信息
 */
const fs = require('fs')
const walkFile = require('../walk-file')
// sql脚本地址
const sqlDir = '/common/sql/'

/**
 * 获取sql目录下的文件目录数据
 * @return {object} 
 */
function getSqlMap () {
  let basePath = __dirname
  basePath = basePath.replace(/\\/g, '\/')

  let pathArr = basePath.split('\/')
  // 当前目录是/utils/db/get-sql-map，需要到根目录,往上走两级
  pathArr = pathArr.splice( 0, pathArr.length - 2 )
  basePath = pathArr.join('/') + sqlDir

  let fileList = walkFile( basePath, 'sql' )
  return fileList
}

module.exports = getSqlMap