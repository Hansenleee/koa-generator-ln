const user = require('./user')

const config = {
  '/user/login': {
    fn: user.userLogin,
    method: 'post'
  }
}

module.exports = {
  prefix: 'manage',
  config: config
}