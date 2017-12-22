/**
 * 验证接口签名
 */
const md5 = require('md5')
// 签名中的字段
const SIGN = md5('libin')

module.exports = {
  /**
   * 验证接口请求头的签名
   * sign格式为md5('ibin') + 2位随机数
   * @return {Boolean} 是否
   */
  validate(header) {
    const sign = header.sign
    if (!sign) return false
    // 两位随机数
    const num = sign.substr(-2)
    const str = sign.replace(num, '')
    // 校验签名
    return str === SIGN && /\d{2}/.test(num)
  },
  /**
   * 登录接口的token值
   * sign签名+13位时间戳+用户名
   * @param {String} user - 用户名
   * @return {String} 返回token
   */
  getToken(user) {
    return SIGN + new Date().getTime() + md5(user)
  },
  /**
   * 校验用户是否登录过,返回对应的用户名
   * @return {String|Boolean} 返回用户名或false
   */
  validateLogin(token) {
    if (!token || token.indexOf(SIGN) !== 0) {
      return false
    }
    token = token.replace(SIGN, '')
    // 获取之后的十三位字符串
    let time = token.substr(0, 13)
    // 转换为数字
    try {
      time = parseInt(time)
    } catch (e) {
      return false
    }
    const now = new Date().getTime()
    // 判断是否为13位时间戳，且时间小于当前时间
    return /^\d{13}$/.test(time) && time < now
  },
}