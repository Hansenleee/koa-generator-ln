/**
 * 分类查询
 */
const query = require('../../../utils/db/sql')

module.exports = {
  /**
   * 查询所有分类
   */
  async queryAllCategory(ctx, next) {
    let result = null
    // 插入
    const sql = `select h.code as header_code,
                    h.name as header_name,
                    h.id as header_id,
                    l.code as line_code,
                    l.name as line_name,
                    l.id as line_id,
                    d.code as detail_code,
                    d.name as detail_name,
                    d.id as detail_id
                from blog_cate_header h
                left join blog_cate_line l on h.id = l.header_id
                left join blog_cate_detail d on l.id = d.line_id`
    // 查询结果
    try {
      result = await query(sql, [])
    } catch (e) {
      ctx.body = {
        code: 'MANAGE_BLOG_CATE_QUERY_ERR',
      }
      return
    }
    // 整合分类信息
    const headers = {}, lines = {}, details = {}, finals = []
    result.forEach((r) => {
      // 整理出头分类信息对象
      if (!headers[r.header_code]) {
        const hitem = {
          code: r.header_code,
          name: r.header_name,
          level: 1,
          id: r.header_id
        }
        headers[r.header_code] = hitem
        finals.push(hitem)
      }
      // 整理行分类信息对象
      if (r.line_code) {
        const litem = {
          code: r.line_code,
          name: r.line_name,
          level: 2,
          id: r.line_id
        }
        if (!lines[r.header_code]) {
          lines[r.header_code] = [litem]
        } else {
          lines[r.header_code].push(litem)
        }
      }
      // 整理详细行分类信息
      if (r.detail_code) {
        const ditem = {
          code: r.detail_code,
          name: r.detail_name,
          level: 3,
        }
        if (!details[r.line_code]) {
          details[r.line_code] = [ditem]
        } else {
          details[r.line_code].push(ditem)
        }
      }
    })
    // 先将detail的详细放入到对应的line信息里
    // Object.keys(lines).forEach((lkey) => {
    //   const litem = lines[lkey]

    //   litem.forEach((item, index) => {

    //     if (details[item.code]) {
    //       litem[index].children = details[item.code]
    //     }
    //   })
    // })
    finals.forEach((h, index) => {
      // 寻找行分类
      const hcode = h.code
      // 寻找行分类是否存在
      if (lines[hcode]) {
        finals[index].children = lines[hcode]
      }

    })
    // 插入成功
    ctx.body = {
      code: 0,
      result: finals,
    }
  }
}