/**
 * 博客分类操作信息
 */
const query = require('../../../utils/db/sql')

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
   * 插入新的行分类信息
   */
  async cateLineInsert(ctx, next) {
    // 获取参数并校验
    const params = ctx.request.body
    if (!_actions.validateParams(params)) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }
    const {code, name, header_id} = params
    // 判断是否重复
    const check = 'select id from blog_cate_line where code = ?'
    let result = await query(check, [code])
    if (result.length !== 0) {
      return ctx.body = {
        code: 'MANAGE_BLOG_CATE_CODE_REPEAT',
      }
    }
    // 插入
    const sql = `insert into
                 blog_cate_line
                 (header_id, code, name, creation_date, created_by, update_date, update_by)
                 VALUES
                 (?, ?, ?, now(), 1, now(), 1)`
    // 查询结果
    try {
      result = await query(sql, [header_id, code, name])
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
   * 更新行分类信息
   */
  async cateLineUpdate(ctx, next) {
    // 获取参数并校验
    const params = ctx.request.body
    if (!_actions.validateParams(params)) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }
    const {code, name} = params
    // 执行sql
    const sql = `update blog_cate_line
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
   * 删除行分类信息
   */
  async cateLineDelete(ctx, next) {
    // 获取参数并校验
    const params = ctx.request.body
    const code = params.code
    if (!code) {
      return ctx.body = {
        code: 'GLOBAL_PARAMS_ERROR',
      }
    }
    // 执行sql
    const sql = `delete from blog_cate_line where code = ?`
    try {
      const result = await query(sql, [code])
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