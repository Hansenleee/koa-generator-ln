const query = require('../../utils/db/sql')
const sign = require('../../utils/security/sign')

module.exports = {
  /**
   * 登录
   */
  async userLogin(ctx, next) {
    const params = ctx.request.body
    const user = params.username
    const password = params.password
    // 查询用户
    const sql = 'select * from sys_users where code = ? and password = ?'
    // 查询结果
    const result = await query(sql, [user, password])
    // 返回结果
    if (result.length == 0) {
      ctx.body = {
        code: 'MANAGE_USER_LOGIN_INFO_ERROR',
      }
    } else {
      // 设置cookie
      const token = sign.getToken(user);
      ctx.cookies.set('_ltk', token)
      ctx.body = {
        code: 0,
      }
    }
  }
}