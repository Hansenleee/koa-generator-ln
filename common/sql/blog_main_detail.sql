/* 文章详情 */
CREATE TABLE IF NOT EXISTS  `blog_main_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `header_id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(100) NOT NULL,
  `update_date` datetime NOT NULL,
  `update_by` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;