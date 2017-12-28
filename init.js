/**
 * 初始项目是必要执行的文件
 * 1 - sql脚本
 */
require('babel-register')
const createAllTables = require('./command/sql')

// 执行
createAllTables()