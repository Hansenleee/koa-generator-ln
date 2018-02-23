const user = require('./user')
const blogCate = require('./blog_cate')

const config = {
  // 用户模块
  '/user/login': {
    fn: user.userLogin,
    method: 'post',
    noAuth: true
  },
  // 博客分类模块
  '/blogCate/header/insert': {
    fn: blogCate.cateHeaderInsert,
    method: 'post'
  },
  '/blogCate/header/update': {
    fn: blogCate.cateHeaderUpdate,
    method: 'post'
  },
  '/blogCate/header/delete': {
    fn: blogCate.cateHeaderDelete,
    method: 'post'
  },
  'blogCate/line/insert': {
    fn: blogCate.cateLineInsert,
    method: 'post'
  },
  'blogCate/line/update': {
    fn: blogCate.cateLineUpdate,
    method: 'post'
  },
  'blogCate/line/delete': {
    fn: blogCate.cateLineDelete,
    method: 'post'
  }
}

module.exports = {
  prefix: 'manage',
  config: config
}