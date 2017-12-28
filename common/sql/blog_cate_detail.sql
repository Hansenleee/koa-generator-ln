CREATE TABLE IF NOT EXISTS  `blog_cate_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line_id` int(11)  NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(100) NOT NULL,
  `update_date` datetime NOT NULL,
  `update_by` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;