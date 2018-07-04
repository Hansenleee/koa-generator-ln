const header = require('./header')
const detail = require('./detail')
const config = {
  // 查询文章头
  '/article/headers': {
    fn: header.queryHeader,
    method: 'get',
  },
  // 新建文章头
  '/article/headers/insert': {
    fn: header.headerInsert,
    method: 'post',
  },
  // 修改文章头
  '/article/headers/update': {
    fn: header.headerUpdate,
    method: 'post',
  },
  // 删除文章头
  '/article/headers/delete': {
    fn: header.headerDelete,
    method: 'post',
  },
  // 查询文章内容
  '/article/detail': {
    fn: detail.detailQuery,
    method: 'get',
  }
}

module.exports = config