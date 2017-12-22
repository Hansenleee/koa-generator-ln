const router = require('koa-router')()
const manage = require('./manage/index')

// 集合
const apis = [
  manage,
]

// 定义全局接口前缀--/api
router.prefix('/api')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Lee'
  })
})

// 增加接口
apis.forEach((api) => {
  // 去除每个模块下的信息
  const name = api.prefix
  const config = api.config
  // 模块下的遍历
  Object.keys(config).forEach((url) => {
    // 接口信息
    const data = config[url]
    // 完整的接口地址
    const fullUrl = `/${name}${url}`
    // 请求方式
    const method = data.method || 'post'
    // 注册接口
    router[method](fullUrl, data.fn)
  })
})

module.exports = router
