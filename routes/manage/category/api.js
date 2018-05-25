const header = require('./header')
const line = require('./line')
const query = require('./query')

const config = {
  '/category/all': {
    fn: query.queryAllCategory,
    method: 'get',
  },
  '/category/header/insert': {
    fn: header.cateHeaderInsert,
    method: 'post'
  },
  '/category/header/update': {
    fn: header.cateHeaderUpdate,
    method: 'post'
  },
  '/category/header/delete': {
    fn: header.cateHeaderDelete,
    method: 'post'
  },
  '/category/line/insert': {
    fn: line.cateLineInsert,
    method: 'post'
  },
  '/category/line/update': {
    fn: line.cateLineUpdate,
    method: 'post'
  },
  '/category/line/delete': {
    fn: line.cateLineDelete,
    method: 'post'
  }
}

module.exports = config