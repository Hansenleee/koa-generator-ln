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
  cateLineInsert() {},
  /**
   * 更新行分类信息
   */
  cateLineUpdate() {},
  /**
   * 删除行分类信息
   */
  cateLineDelete() {},
}