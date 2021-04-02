CREATE DATABASE `thenetworkdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `thenetworkdb`

CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `dateOfBirth` datetime NOT NULL,
  `profilePicture` blob,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

