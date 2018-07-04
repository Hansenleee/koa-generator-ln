/* 文章列表 */
CREATE TABLE IF NOT EXISTS  `blog_article_header` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `title` varchar(2000) NOT NULL,
  `desciption` varchar(2000) NOT NULL,
  `short_desc` varchar(200),
  `cate_line_id` int(11) NOT NULL,
  `tag` varchar(255),
  `creation_date` datetime NOT NULL,
  `created_by` int(100) NOT NULL,
  `update_date` datetime NOT NULL,
  `update_by` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;