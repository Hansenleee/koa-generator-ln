/**
 * 文章头表
 */
const query = require('../../../utils/db/sql')

module.exports = {
  /**
   * 查询文章列表
   */
  async queryArticles(ctx, next) {
    const requestQuery = ctx.request.query
    const currentPage = parseInt(requestQuery.currentPage)
    const pageSize = parseInt(requestQuery.pageSize)
    // 分页查询行号
    const fromRowNumber = (currentPage - 1) * pageSize
    const toRowNumber = currentPage * pageSize
    let result
    const sql = `select
                    h.id, h.code, h.title, h.desciption, h.type,
                    l.header_id as cate_header_id,
                    h.cate_line_id,
                    l.name as cate_name,
                    UNIX_TIMESTAMP(h.update_date) as date,
                    (select count(*) from blog_article_header) as total
                 from blog_article_header h, blog_cate_line l
                 where h.cate_line_id = l.id
                 order by h.update_date desc
                 LIMIT ?, ?`
    // 查询结果
    try {
      result = await query(sql, [fromRowNumber, toRowNumber])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_QUERY_ERR',
      }
      return
    }

    ctx.body = {
      code: 0,
      result: {
        list: result,
        currentPage,
        pageSize,
        totalCount: currentPage === 1 && result.length === 0 ? 0 : result[0].total || 0,
      },
    }
  },
  /**
   * 查询文章详情
   */
  async queryArticlesDetail(ctx, next) {
    console.log(process.env.NODE_ENV)
    const { id } = ctx.params
    const { password } = ctx.request.query

    let result
    const sql = `select h.title,
                      l.name as cate_name,
                      d.content,
                      UNIX_TIMESTAMP(d.update_date) as date
                 from blog_cate_line l, blog_article_header h
                 left join blog_article_detail d on d.header_id = h.id
                 where h.id = ?
                   and h.cate_line_id = l.id
                   and (h.type != '2' or md5(h.password) = ?)`
    // 查询结果
    try {
      result = await query(sql, [id, password])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_QUERY_ERR',
      }
      return
    }

    if (!Array.isArray(result) || result.length === 0) {
      return ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_QUERY_ERR',
      }
    }

    ctx.body = {
      code: 0,
      result: result[0],
    }
  },
  /**
   * 检验文章查看密码
   */
  async checkArticlePassword(ctx, next) {
    const { id, password } = ctx.params
    let result
    const sql = `
                  select h.id from blog_article_header h
                  where h.id = ? and h.type = '2' and h.password = ?
                `
    try {
      result = await query(sql, [id, password])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_PASSWORD_ERR',
      }
      return
    }

    if (result.length === 0) {
      return ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_PASSWORD_ERR',
      }
    }

    ctx.body = {
      code: 0
    }
  }
}