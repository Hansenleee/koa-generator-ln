/**
 * 博客分类操作信息
 */
const query = require('../../../utils/db/sql')
const multipleQuery = require('../../../utils/db/multiple-query')

// 全局操作函数
const _actions = {
  /**
   * 校验参数
   * @param {Object} params - 参数
   * @return {Boolean} 返回是否通过
   */
  validateParams(params) {
    const { code, name } = params
    return !!code && !!name
  }
}

module.exports = {
  /**
   * 插入新的头分类信息--ctx, next
   * @param {String} code - 分类的代码
   * @param {String} name - 分类名称
   */
  async cateHeaderInsert(ctx, next) {
    // 获取参数并校验
    const params = ctx.request.body
    if (!_actions.validateParams(params)) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }
    const {code, name} = params
    // 判断是否重复
    const check = 'select id from blog_cate_header where code = ?'
    let result = await query(check, [code])
    if (result.length !== 0) {
      return ctx.body = {
        code: 'MANAGE_BLOG_CATE_CODE_REPEAT',
      }
    }
    // 插入
    const sql = `insert into
                 blog_cate_header
                 (code, name, creation_date, created_by, update_date, update_by)
                 VALUES
                 (?, ?, now(), 1, now(), 1)`
    // 查询结果
    try {
      result = await query(sql, [code, name])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_CATE_ERROR',
      }
      return
    }
    // 插入成功
    ctx.body = {
      code: 0,
    }
  },
  /**
   * 更新头分类信息--ctx, next
   * @param {String} code - 分类的代码
   * @param {String} name - 分类名称
   */
  async cateHeaderUpdate(ctx, next) {
    // 获取参数并校验
    const params = ctx.request.body
    if (!_actions.validateParams(params)) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }
    const {code, name} = params
    // 执行sql
    const sql = `update blog_cate_header
                 set name = ?
                 where code = ?`
    try {
      const result = await query(sql, [name, code])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_CATE_ERROR',
      }
      return
    }
    // 更新结果
    ctx.body = {
      code: 0,
    }
  },
  /**
   * 删除头分类信息, --ctx, next
   * @param {String} code - 分类的代码
   */
  async cateHeaderDelete(ctx, next) {
    // 获取参数并校验
    const params = ctx.request.body
    const code = params.code
    if (!code) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }
    // 执行sql
    const sql = `delete from blog_cate_header where code = ?;
                 delete from blog_cate_line where header_id = (select h.id from blog_cate_header h where h.code = ?)`
    try {
      const result = await multipleQuery(sql, [code, code])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_CATE_ERROR',
      }
      return
    }
    // 删除结果
    ctx.body = {
      code: 0,
    }
  },
}