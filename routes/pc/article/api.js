const article = require('./article')


const config = {
  // 查询文章头
  '/articles': {
    fn: article.queryArticles,
    method: 'get',
    noAuth: true,
  },
  '/articles/:id': {
    fn: article.queryArticlesDetail,
    method: 'get',
    noAuth: true,
  }
}

module.exports = config