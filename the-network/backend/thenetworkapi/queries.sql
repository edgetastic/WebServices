<<<<<<< HEAD
CREATE DATABASE `thenetworkdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `thenetworkdb`

CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
=======
CREATE DATABASE `thenetworkdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
>>>>>>> d1f487c90df86664d3e6e4dad263695acef27f09
  `email` varchar(200) NOT NULL,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `dateOfBirth` datetime NOT NULL,
<<<<<<< HEAD
  `profilePicture` blob,
=======
  `profilePicture` varchar(200) DEFAULT NULL,
>>>>>>> d1f487c90df86664d3e6e4dad263695acef27f09
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

<<<<<<< HEAD
=======

CREATE TABLE `posts` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `picturePath` varchar(255) DEFAULT NULL,
  `likes` int NOT NULL,
  `userId` int NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`postId`),
  KEY `fk_userId_idx` (`userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comments` (
  `commentId` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  KEY `userId_idx` (`userId`),
  KEY `fk_post_id` (`postId`),
  CONSTRAINT `fk_post_id` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>>>>>>> d1f487c90df86664d3e6e4dad263695acef27f09
