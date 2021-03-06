/**
 * 文章头表
 */
const query = require('../../../utils/db/sql')
const multipleQuery = require('../../../utils/db/multiple-query')

module.exports = {
  /**
   * 查询
   */
  async queryHeader(ctx, next) {
    // const { currentPage, pageSize } = ctx.request.query
    const requestQuery = ctx.request.query
    const currentPage = parseInt(requestQuery.currentPage)
    const pageSize = parseInt(requestQuery.pageSize)
    // 分页查询行号
    const fromRowNumber = (currentPage - 1) * pageSize
    const toRowNumber = currentPage * pageSize
    let result
    const sql = `select
                    h.id, h.code, h.title, h.desciption,h.type, h.password,
                    l.header_id as cate_header_id,
                    h.cate_line_id,
                    l.name as cate_name,
                    h.creation_date,
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
   * 新建
   * @param {String} type - 文章类别：1 - 普通、2 - 加密
   */
  async headerInsert(ctx, next) {
    const params = ctx.request.body
    const { code, title, desciption, cate_line_id, type, password = '' } = params

    // 校验参数
    if (!code || !title || !cate_line_id || !desciption || !type) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }

    // 判断code重复
    const check = 'select id from blog_article_header where code = ?'
    let result = await query(check, [code])
    if (result.length !== 0) {
      return ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_CODE_REPEAT',
      }
    }

    // 插入
    const sql = `insert into
                 blog_article_header
                 (code, title, desciption, cate_line_id, type, password, creation_date, created_by, update_date, update_by)
                 VALUES
                 (?, ?, ?, ?, ?, ?, now(), 1, now(), 1)`
    // 查询结果
    try {
      result = await query(sql, [code, title, desciption, cate_line_id, type, password])
    } catch (e) {
      global.console.log(e);
      ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_ERROR',
      }
      return
    }
    // 插入成功
    ctx.body = {
      code: 0,
    }
  },
  /**
   * 修改
   */
  async headerUpdate(ctx, next) {
    const params = ctx.request.body
    const { code, title, desciption, cate_line_id, type, password } = params

    // 校验参数
    if (!code || !title || !cate_line_id || !desciption) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }

    const sql = `update blog_article_header
                 set title = ?,
                     cate_line_id = ?,
                     desciption = ?,
                     type = ?,
                     password = ?
                  where code = ?`
    try {
      const result = await query(sql, [title, cate_line_id, desciption, type, password, code])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_ERROR',
      }
      return
    }
    // 更新结果
    ctx.body = {
      code: 0,
    }
  },
  /**
   * 删除
   */
  async headerDelete(ctx, next) {
    // 获取参数并校验
    const params = ctx.request.body
    const { id } = params
    if (!id) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }
    // 执行sql
    const sql = `delete from blog_article_header where id = ?;
                 delete from blog_article_list where header_id = ?`
    try {
      const result = await multipleQuery(sql, [id, id])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_ARTICLE_ERROR',
      }
      return
    }
    // 删除结果
    ctx.body = {
      code: 0,
    }
  }
}