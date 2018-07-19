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
  },
  /**
   * 编辑内容
   */
  async detailUpdate(ctx, next) {
    const { header_id, content } = ctx.request.body
    let result

    let sql = `select id from blog_article_detail where header_id = ?`

    // 查询结果
    try {
      result = await query(sql, [header_id])
    } catch (e) {
      return ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_ERROR',
      }
    }

    if (result.length === 0) {
      // 新增
      sql = `insert into
             blog_article_detail
             (content, header_id, creation_date, created_by, update_date, update_by)
             VALUES
             (?, ?, now(), 1, now(), 1)`
    } else {
      // 编辑修改
      sql = `update blog_article_detail
             set content = ?,
                 update_date = now()
             where header_id = ?`
    }

    try {
      result = await query(sql, [content, header_id])
    } catch (e) {
      return ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_ERROR',
      }
    }

    ctx.body = {
      code: 0,
    }
  }
}