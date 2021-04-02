CREATE DATABASE authorsdb;
USE authorsdb;

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL UNIQUE,
  `name` varchar(200) NOT NULL,
  `writing_type` varchar(200) NOT NULL
);
 
ALTER TABLE `authors` ADD PRIMARY KEY (`id`);
ALTER TABLE `authors` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `authors` (`id`, `email`, `name`, `writing_type`) VALUES
(1, 'shaespear@gmail.com', 'Shakespear', 'Romantic'),
(2, 'charles@gmail.com', 'Charles Dickens', 'Fiction');

CREATE TABLE IF NOT EXISTS `books` (
	`id` int(11) NOT NULL,
    `title` varchar(200) NOT NULL,
    `subtitle` varchar(200) NOT NULL,
    `reviews` int(11) NOT NULL,
    `description` varchar(200) NOT NULL,
    `editor` varchar(200) NOT NULL,
    `author_id` int(11) NOT NULL
);

ALTER TABLE `books` ADD PRIMARY KEY (`id`);
ALTER TABLE `books` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `books` ADD FOREIGN KEY (`author_id`) REFERENCES authors(`id`);

INSERT INTO `books` (`id`, `title`, `subtitle`, `reviews`, `description`, `editor`, `author_id`) VALUES
(1, 'Hamlet', 'An awesome book for awesome people', 5, 'The story of hamlet', 'Cool editor', 1),
(2, 'The Tempest', 'Another awesome book by your own Shakespeare', 4, 'The story of the Tempest', 'Another cool editor', 1),
(3, 'Oliver Twist', 'An awesome book by Charles Dickes', 5, 'The story of Oliver Twist', 'Awesome editor', 2),
(4, 'A Christmas Carol', 'Another awesome book by your own Dickens', 4, 'The story of the Christmas Carol', 'Another awesome editor', 2);
