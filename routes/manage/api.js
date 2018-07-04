const user = require('./user')
const category = require('./category/api')
const article = require('./article/api')

const config = {
  // 用户模块
  '/user/login': {
    fn: user.userLogin,
    method: 'post',
    noAuth: true
  },
}

module.exports = {
  prefix: 'manage',
  config: Object.assign({}, config, category, article)
}