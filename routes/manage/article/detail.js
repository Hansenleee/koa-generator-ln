/**
 * 文章详情
 */
const query = require('../../../utils/db/sql')

module.exports = {
  /**
   * 查询
   */
  async detailQuery(ctx, next) {
    const { id } = ctx.request.query
    const sql = `select
                   h.title,
                   h.desciption,
                   h.creation_date,
                   d.content
                 from blog_article_header h
                 left join blog_article_detail d on d.header_id = h.id
                 where h.id = ?`
    let result
    // 查询结果
    try {
      result = await query(sql, [id])
    } catch (e) {
      return ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_DETAIL_QUERY_ERR',
      }
    }

    if (result.length === 0) {
      return ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_DETAIL_QUERY_ERR',
      }
    }

    ctx.body = {
      code: 0,
      result: result[0] || {},
    }
  }
}