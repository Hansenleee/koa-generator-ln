import { read } from 'fs';

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// 解决跨域
const cors = require('koa-cors')
const logger = require('koa-logger')
// 接口地址统一入口
const index = require('./routes/index')
// 接口签名
const sign = require('./utils/security/sign')
// 格式化输出
const responseFormatter = require('./middlewares/response_formatter')
// 日志打印工具
const logUtil = require('./utils/log_util')

// error handler
onerror(app)

/**
 * 中间件
 */
app.use(cors({
  // 携带cookie
  credentials: true, 
  origin: 'http://localhost:3001'
}));
// 请求格式（post请求需要带参数）
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 静态资源
app.use(require('koa-static')(__dirname + '/public'))
// 暂时用不到
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 接口响应输出格式化
app.use(responseFormatter)
/**
 * 验证接口有效、封装接口最终返回结构
 * koa2采用next()环形链接，业务逻辑中不允许直接返回
 */
app.use(async (ctx, next) => {
  // 请求头
  const header = ctx.request.header
  if (sign.validate(header)) {
    // 校验通过
    await next()
  } else {
    // 不合法的请求
    ctx.body = {
      code: 'UNAVAILABLE'
    }
  }
})

// 打印接口时间
app.use(async (ctx, next) => {
  const start = new Date()
  let ms
  try {
    // 运行下一个
    await next();
    ms = new Date() - start
    // 记录响应日志
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }
  // 打印接口时间
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 接口路由
app.use(index.routes(), index.allowedMethods())

module.exports = app
