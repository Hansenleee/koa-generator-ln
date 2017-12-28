CREATE TABLE IF NOT EXISTS  `sys_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `phone` int(100) NOT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `role` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int(100) NOT NULL,
  `update_date` datetime NOT NULL,
  `update_by` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;