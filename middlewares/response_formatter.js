/**
 * 在app.use(router)之前调用
 */

// 接口返回的code集合
const messageCode = require('../common/code/index')

module.exports = async (ctx, next) => {
  //先去执行路由
  await next();
  // 判断返回数据
  const body = ctx.body
  // 返回的错误code
  const code = Object.prototype.hasOwnProperty.call(body, 'code') ? (body.code + '') : 'ERROR'
  const message = messageCode[code]
  // 封装响应格式
  if (body && code === "0") {
    ctx.body = {
      code: 0,
      message: message,
      result: body.result
    }
  } else {
    // 返回错误
    ctx.body = {
      code: code,
      message: message
    }
  }
}
