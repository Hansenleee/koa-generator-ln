/* 文章列表 */
CREATE TABLE IF NOT EXISTS  `blog_main_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `title` varchar(2000) NOT NULL,
  `desciption` varchar(2000) NOT NULL,
  `short_desc` varchar(200) NOT NULL,
  `cate_detail_id` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(100) NOT NULL,
  `update_date` datetime NOT NULL,
  `update_by` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;