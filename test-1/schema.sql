CREATE DATABASE grocerydb;
USE grocerydb;

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `sku_id` varchar(6) NOT NULL UNIQUE,
  `product_name` varchar(200) NOT NULL,
  `expiration_date` datetime NOT NULL
);
 
ALTER TABLE `products` ADD PRIMARY KEY (`id`);
ALTER TABLE `products` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `products` (`id`, `sku_id`, `product_name`, `expiration_date`) VALUES
(1, 'iy4189', 'Butter', '2021-04-10'),
(2, 'ek613', 'Whole grain bread', '2021-04-15'),
(3, 'pb016', 'Almond Milk', '2021-04-18');