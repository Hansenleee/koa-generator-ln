const article = require('./article')


const config = {
  // 查询文章头
  '/articles': {
    fn: article.queryArticles,
    method: 'get',
    noAuth: true,
  },
  // 查询文章详情
  '/articles/:id': {
    fn: article.queryArticlesDetail,
    method: 'get',
    noAuth: true,
  },
  // 校验文章密码
  '/articles/:id/password/:password': {
    fn: article.checkArticlePassword,
    method: 'get',
    noAuth: true,
  },
}

module.exports = config