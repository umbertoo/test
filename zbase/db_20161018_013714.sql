-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE TABLE "server_roles" -----------------------------
CREATE TABLE `server_roles` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`serverId` Int( 11 ) NULL,
	`roleId` Int( 11 ) NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- Dump data of "server_roles" -----------------------------
INSERT INTO `server_roles`(`id`,`createdAt`,`updatedAt`,`serverId`,`roleId`) VALUES ( '1', '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '1' );
INSERT INTO `server_roles`(`id`,`createdAt`,`updatedAt`,`serverId`,`roleId`) VALUES ( '2', '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '2' );
-- ---------------------------------------------------------


-- CREATE INDEX "roleId" -----------------------------------
CREATE INDEX `roleId` USING BTREE ON `server_roles`( `roleId` );
-- ---------------------------------------------------------


-- CREATE INDEX "serverId" ---------------------------------
CREATE INDEX `serverId` USING BTREE ON `server_roles`( `serverId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "messages" ---------------------------------
CREATE TABLE `messages` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`text` VarChar( 255 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`channelId` Int( 11 ) NOT NULL,
	`serverId` Int( 11 ) NOT NULL,
	`userId` Int( 11 ) NOT NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 136;
-- ---------------------------------------------------------


-- Dump data of "messages" ---------------------------------
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '2', 'm@@essaa!!!!qqqqqqqqqqqqrrraerrdddd2222edge 222 :innocent: ', '2016-09-24 22:45:51', '2016-10-15 20:19:46', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '5', 'Businesses of all swwwewizes use GitHuaaab to support their aaaa development process adfdnd securely build software.  :thinking_face: www', '2016-09-25 13:06:40', '2016-10-15 19:30:42', '1', '2', '1' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '6', ' hobbyists to professionals, GitHub helps developers simplify the way they build software.  :sunglasses:   :money_mouth_face: ', '2016-09-25 13:08:46', '2016-09-25 13:08:46', '1', '2', '1' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '7', 'GitHub fosters a fast,   :hugging_face: flexible, and collaborative development process that lets you work on your own or with others', '2016-09-25 13:12:26', '2016-09-25 13:12:26', '1', '2', '1' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '8', 'One platform, from staddrt to finish  :+1: ', '2016-09-25 13:13:05', '2016-10-15 17:20:03', '1', '2', '1' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '9', 'Use GitHub to create a personal pr  :baby_chick: oject, whether you want to experiment with a new programming language or host your life’s work.   :expressionless: ', '2016-09-25 13:13:32', '2016-09-25 13:13:32', '1', '2', '1' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '10', 'hello people  :raised_hands: ', '2016-09-25 13:14:59', '2016-09-25 13:14:59', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '11', 'what are you going to do?  :snowboarder: ', '2016-09-25 13:19:00', '2016-09-25 13:19:00', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '12', ' :timer_clock:  time ', '2016-09-25 13:21:31', '2016-09-25 13:21:31', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '13', 'Millions of developers use GitHub to build personal projects, support their businesses, and work together on open source technologies.', '2016-09-25 13:24:11', '2016-09-25 13:24:11', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '14', ' :upside_down_face:  How people build software', '2016-09-25 13:24:20', '2016-09-25 13:24:20', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '15', ' :no_mouth:  :pear: ', '2016-09-25 13:28:32', '2016-09-25 13:28:32', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '16', 'See what people are working on', '2016-09-25 13:29:04', '2016-09-25 13:29:04', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '17', 'Learn how developers build software', '2016-09-25 13:29:08', '2016-09-25 13:29:08', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '18', 'Share your work with the world', '2016-09-25 13:29:12', '2016-09-25 13:29:12', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '19', 'Share your project so others can use it or to get feedback from the GitHub community.    :sunglasses: :earth_africa:  :earth_africa: :earth_africa: ', '2016-09-25 13:29:41', '2016-09-25 13:29:41', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '20', 'There is a lot happening on GitHub. Here are a few ways to get started.', '2016-09-25 13:29:52', '2016-09-25 13:29:52', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '21', '1wewq :sunglasses: ', '2016-09-25 13:31:11', '2016-09-26 16:27:20', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '22', '2', '2016-09-25 13:31:13', '2016-09-25 13:31:13', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '23', '3we wqe  :face_with_rolling_eyes:  ', '2016-09-25 13:31:13', '2016-09-26 16:27:30', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '24', '4', '2016-09-25 13:31:14', '2016-09-25 13:31:14', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '25', '5', '2016-09-25 13:31:15', '2016-09-25 13:31:15', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '26', '6', '2016-09-25 13:31:16', '2016-09-25 13:31:16', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '27', '7', '2016-09-25 13:31:16', '2016-09-25 13:31:16', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '28', '8', '2016-09-25 13:31:17', '2016-09-25 13:31:17', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '29', '9', '2016-09-25 13:31:17', '2016-09-25 13:31:17', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '30', '0', '2016-09-25 13:31:19', '2016-09-25 13:31:19', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '31', '1', '2016-09-25 13:31:21', '2016-09-25 13:31:21', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '32', '2', '2016-09-25 13:31:22', '2016-09-25 13:31:22', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '33', '3', '2016-09-25 13:31:23', '2016-09-25 13:31:23', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '34', '4', '2016-09-25 13:31:24', '2016-09-25 13:31:24', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '35', '5', '2016-09-25 13:31:24', '2016-09-25 13:31:24', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '36', '6', '2016-09-25 13:31:25', '2016-09-25 13:31:25', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '37', '7', '2016-09-25 13:31:26', '2016-09-25 13:31:26', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '38', '8', '2016-09-25 13:31:26', '2016-09-25 13:31:26', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '39', '9', '2016-09-25 13:31:27', '2016-09-25 13:31:27', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '40', '1', '2016-09-25 13:31:30', '2016-09-25 13:31:30', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '41', '2', '2016-09-25 13:31:31', '2016-09-25 13:31:31', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '42', '3yuy', '2016-09-25 13:31:32', '2016-09-26 19:54:39', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '43', '4', '2016-09-25 13:31:32', '2016-09-25 13:31:32', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '44', '5', '2016-09-25 13:31:33', '2016-09-25 13:31:33', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '45', '6asda :unamused: e', '2016-09-25 13:31:34', '2016-09-26 17:52:20', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '46', '731512  :heart_eyes: ', '2016-09-25 13:31:35', '2016-09-26 17:54:55', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '47', ' :pray:  sssasda', '2016-09-25 13:31:36', '2016-09-26 19:56:07', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '48', '9ssdf', '2016-09-25 13:31:37', '2016-09-26 18:05:07', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '49', '0', '2016-09-25 13:31:38', '2016-09-25 13:31:38', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '50', '30------', '2016-09-25 13:32:23', '2016-09-25 13:32:23', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '51', '1', '2016-09-25 13:32:52', '2016-09-25 13:32:52', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '52', '2', '2016-09-25 13:32:53', '2016-09-25 13:32:53', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '53', '3', '2016-09-25 13:32:54', '2016-09-25 13:32:54', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '54', '4', '2016-09-25 13:32:55', '2016-09-25 13:32:55', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '55', '5r', '2016-09-25 13:32:55', '2016-09-26 16:06:26', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '56', '6d', '2016-09-25 13:32:56', '2016-09-26 15:51:42', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '57', '7', '2016-09-25 13:32:57', '2016-09-25 13:32:57', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '58', '8 алоха', '2016-09-25 13:32:58', '2016-09-26 16:10:42', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '59', '9', '2016-09-25 13:32:59', '2016-09-25 13:32:59', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '60', '0', '2016-09-25 13:33:00', '2016-09-25 13:33:00', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '61', '41', '2016-09-25 13:33:40', '2016-09-25 13:33:40', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '62', '42', '2016-09-25 13:33:42', '2016-09-25 13:33:42', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '63', '43', '2016-09-25 13:33:44', '2016-09-25 13:33:44', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '64', '44', '2016-09-25 13:33:45', '2016-09-25 13:33:45', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '65', '45', '2016-09-25 13:33:46', '2016-09-25 13:33:46', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '66', '46', '2016-09-25 13:33:48', '2016-09-25 13:33:48', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '67', '47', '2016-09-25 13:33:49', '2016-09-25 13:33:49', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '68', 'провекаewrew', '2016-09-25 14:27:57', '2016-10-03 18:35:59', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '69', ' :face_with_rolling_eyes: ', '2016-09-25 14:28:07', '2016-09-25 14:28:07', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '70', ' :sunglasses: 123wwwjjj оп оп', '2016-09-26 11:29:20', '2016-09-26 16:10:28', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '71', 'werewr456', '2016-09-26 15:41:43', '2016-09-26 15:53:58', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '72', 'kjkl', '2016-09-27 08:00:05', '2016-09-27 08:00:05', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '73', '34\\', '2016-09-27 08:02:06', '2016-09-27 08:02:06', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '74', 'rwerJ', '2016-09-27 08:08:57', '2016-10-03 18:59:36', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '75', 'wqew :kissing_heart: ', '2016-09-27 08:14:32', '2016-09-27 08:14:32', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '76', 'привет)', '2016-09-27 08:17:39', '2016-09-27 08:17:39', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '78', '234', '2016-09-27 09:37:54', '2016-09-27 09:37:54', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '79', 'ewew :thinking_face: 
', '2016-09-27 10:01:43', '2016-09-27 10:01:43', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '80', 'привет  :face_with_rolling_eyes: ', '2016-09-27 12:23:25', '2016-09-27 12:23:25', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '81', ' :kissing_closed_eyes:  попытка 2', '2016-09-27 12:23:53', '2016-09-27 12:23:53', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '82', 'попытка 3  :thinking_face: ', '2016-09-27 12:24:52', '2016-09-27 12:24:52', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '83', 'trying 4', '2016-09-27 12:25:31', '2016-09-27 12:25:31', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '84', '
22', '2016-09-27 12:26:06', '2016-09-27 12:26:06', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '85', '
342', '2016-09-27 12:26:18', '2016-09-27 12:26:18', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '86', 'wewer', '2016-09-27 12:27:05', '2016-09-27 12:27:05', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '87', '234retrereert', '2016-09-27 12:27:28', '2016-09-28 16:15:44', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '88', 'ewr', '2016-09-27 12:29:09', '2016-09-27 12:29:09', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '89', 'check', '2016-09-27 12:30:06', '2016-09-27 12:30:06', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '90', '234', '2016-09-27 12:31:46', '2016-09-27 12:31:46', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '91', 'now ', '2016-09-27 12:32:34', '2016-09-27 12:32:34', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '92', 'hhh', '2016-09-27 12:34:55', '2016-09-27 12:41:35', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '93', 'yes', '2016-09-27 12:39:08', '2016-09-27 12:39:08', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '94', 'zzz', '2016-09-27 12:39:21', '2016-09-27 12:39:21', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '95', 'aasd', '2016-09-27 12:40:57', '2016-09-27 12:40:57', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '96', '
wqewwqewqe', '2016-09-27 12:41:03', '2016-09-27 12:41:03', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '97', 'iouyiy
', '2016-09-27 12:41:09', '2016-09-27 13:07:18', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '99', 'wqewq', '2016-09-27 13:07:21', '2016-09-27 13:17:24', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '100', 'sd', '2016-09-27 13:12:35', '2016-09-27 13:12:35', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '101', 'df', '2016-09-27 13:12:46', '2016-09-27 13:12:46', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '102', 'sdf', '2016-09-27 13:13:31', '2016-09-27 13:13:31', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '103', 'dsfds', '2016-09-27 13:14:08', '2016-09-27 13:14:08', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '104', 'привет !!!!  :open_mouth:  :thinking_face: hmm', '2016-09-27 13:18:20', '2016-09-27 14:03:48', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '105', 'whats up  :hugging_face: ', '2016-09-27 14:04:03', '2016-09-27 14:04:20', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '113', '45', '2016-09-27 14:15:35', '2016-09-27 14:15:35', '1', '3', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '114', '4324324  :sunglasses:', '2016-09-27 14:17:20', '2016-09-27 14:17:20', '1', '1', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '115', '234', '2016-09-27 14:17:52', '2016-09-27 14:17:52', '1', '1', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '116', '342', '2016-09-27 14:19:06', '2016-09-27 14:19:06', '1', '1', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '117', '123123', '2016-09-27 14:33:53', '2016-09-27 14:33:53', '1', '1', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '118', ':eyes:', '2016-09-27 14:34:03', '2016-09-27 14:34:03', '1', '1', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '120', 'uuuuu', '2016-09-28 13:13:35', '2016-09-28 13:13:35', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '121', 'werewewrwe', '2016-09-28 13:19:55', '2016-09-28 13:19:55', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '122', 'ertreertert', '2016-09-28 13:20:07', '2016-09-28 13:20:07', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '123', '224', '2016-09-28 13:20:13', '2016-09-28 13:20:13', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '124', 'sdfsdsfsd :money_mouth_face: ', '2016-09-28 13:20:53', '2016-10-05 09:01:47', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '125', 'sdfdsfewewr', '2016-09-28 13:20:58', '2016-09-28 13:20:58', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '126', 'dsdsdfs', '2016-09-28 13:21:07', '2016-09-28 13:21:07', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '127', 'dsdfdsfsdewewr', '2016-09-28 13:25:41', '2016-10-04 10:25:40', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '128', 'dsdsfsd', '2016-09-28 13:25:46', '2016-09-28 13:25:46', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '129', 'sdfds', '2016-09-28 13:25:48', '2016-09-28 13:25:48', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '130', 'sdfdsdsadassadsad', '2016-09-28 13:25:50', '2016-09-28 16:02:36', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '131', 'dddfdsdsdfsdfdferew', '2016-09-28 14:04:27', '2016-10-03 20:11:35', '1', '2', '3' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '132', 'dfsdsfsd', '2016-09-28 14:05:16', '2016-09-28 14:05:16', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '133', 'dsfsdsf', '2016-09-28 14:05:25', '2016-09-28 14:05:25', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '134', 'ewew :kissing_heart:', '2016-10-04 10:44:58', '2016-10-04 10:44:58', '1', '2', '2' );
INSERT INTO `messages`(`id`,`text`,`createdAt`,`updatedAt`,`channelId`,`serverId`,`userId`) VALUES ( '135', 'ewrwwerwerewewewr', '2016-10-04 10:45:34', '2016-10-04 10:45:34', '1', '2', '3' );
-- ---------------------------------------------------------


-- CREATE INDEX "channelId" --------------------------------
CREATE INDEX `channelId` USING BTREE ON `messages`( `channelId` );
-- ---------------------------------------------------------


-- CREATE INDEX "serverId" ---------------------------------
CREATE INDEX `serverId` USING BTREE ON `messages`( `serverId` );
-- ---------------------------------------------------------


-- CREATE INDEX "userId" -----------------------------------
CREATE INDEX `userId` USING BTREE ON `messages`( `userId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "servers" ----------------------------------
CREATE TABLE `servers` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	`description` VarChar( 255 ) NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 4;
-- ---------------------------------------------------------


-- Dump data of "servers" ----------------------------------
INSERT INTO `servers`(`id`,`name`,`description`,`createdAt`,`updatedAt`) VALUES ( '1', 'server1', 'first server', '2016-10-14 19:26:50', '2016-10-14 19:26:50' );
INSERT INTO `servers`(`id`,`name`,`description`,`createdAt`,`updatedAt`) VALUES ( '2', 'server2', 'second server', '2016-10-14 19:26:50', '2016-10-14 19:26:50' );
INSERT INTO `servers`(`id`,`name`,`description`,`createdAt`,`updatedAt`) VALUES ( '3', 'server3', 'third server', '2016-10-14 19:26:50', '2016-10-14 19:26:50' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "actions" ----------------------------------
CREATE TABLE `actions` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 4;
-- ---------------------------------------------------------


-- Dump data of "actions" ----------------------------------
INSERT INTO `actions`(`id`,`name`,`createdAt`,`updatedAt`) VALUES ( '1', 'edit', '2016-10-14 20:01:41', '2016-10-14 20:01:41' );
INSERT INTO `actions`(`id`,`name`,`createdAt`,`updatedAt`) VALUES ( '2', 'create', '2016-10-14 20:01:41', '2016-10-14 20:01:41' );
INSERT INTO `actions`(`id`,`name`,`createdAt`,`updatedAt`) VALUES ( '3', 'delete', '2016-10-14 20:01:41', '2016-10-14 20:01:41' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "users" ------------------------------------
CREATE TABLE `users` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	`password` VarChar( 255 ) NULL,
	`avatar` VarChar( 255 ) NULL DEFAULT '/images/avatars/defavatar.jpg',
	`email` VarChar( 255 ) NOT NULL,
	`resetPasswordToken` VarChar( 255 ) NULL,
	`resetPasswordExpires` DateTime NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 4;
-- ---------------------------------------------------------


-- Dump data of "users" ------------------------------------
INSERT INTO `users`(`id`,`name`,`password`,`avatar`,`email`,`resetPasswordToken`,`resetPasswordExpires`,`createdAt`,`updatedAt`) VALUES ( '1', 'utro', '$2a$10$GfoZaSN5k78A9MvotLH3IulqUR2X.DgLme9SBCcpq1NkLLtGzRZfW', '/images/avatars/defavatar.jpg', 'v.kokovin@gmail.com', NULL, NULL, '2016-10-14 19:26:51', '2016-10-14 19:26:51' );
INSERT INTO `users`(`id`,`name`,`password`,`avatar`,`email`,`resetPasswordToken`,`resetPasswordExpires`,`createdAt`,`updatedAt`) VALUES ( '2', 'admin', '$2a$10$nrOPJdXA7SLC59eFPJMyIui3Ug4lhlOD2TRblgudmsXXHLe/r5Jti', '/images/avatars/defavatar.jpg', 'test@test.test', NULL, NULL, '2016-10-14 19:26:51', '2016-10-14 19:26:51' );
INSERT INTO `users`(`id`,`name`,`password`,`avatar`,`email`,`resetPasswordToken`,`resetPasswordExpires`,`createdAt`,`updatedAt`) VALUES ( '3', 'superchel', '$2a$10$3VZwO0gz4wd34N4OY96wOur59DHMcsrY1igfjrF2D4IK9Bj2Jo5Y2', '/images/avatars/defavatar.jpg', 'test2@test.test', NULL, NULL, '2016-10-14 19:26:51', '2016-10-14 19:26:51' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "resources" --------------------------------
CREATE TABLE `resources` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- Dump data of "resources" --------------------------------
INSERT INTO `resources`(`id`,`name`,`createdAt`,`updatedAt`) VALUES ( '1', 'server', '2016-10-14 19:26:35', '2016-10-14 19:26:35' );
INSERT INTO `resources`(`id`,`name`,`createdAt`,`updatedAt`) VALUES ( '2', 'message', '2016-10-14 20:01:41', '2016-10-14 20:01:41' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "roles" ------------------------------------
CREATE TABLE `roles` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- Dump data of "roles" ------------------------------------
INSERT INTO `roles`(`id`,`name`,`createdAt`,`updatedAt`) VALUES ( '1', 'admin', '2016-10-14 20:01:41', '2016-10-14 20:01:41' );
INSERT INTO `roles`(`id`,`name`,`createdAt`,`updatedAt`) VALUES ( '2', 'manager', '2016-10-14 20:01:41', '2016-10-14 20:01:41' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "channels" ---------------------------------
CREATE TABLE `channels` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	`description` VarChar( 255 ) NULL,
	`order` Int( 11 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`serverId` Int( 11 ) NOT NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 4;
-- ---------------------------------------------------------


-- Dump data of "channels" ---------------------------------
INSERT INTO `channels`(`id`,`name`,`description`,`order`,`createdAt`,`updatedAt`,`serverId`) VALUES ( '1', 'channel2', 'second channel', '1', '2016-10-14 19:26:51', '2016-10-14 19:26:51', '1' );
INSERT INTO `channels`(`id`,`name`,`description`,`order`,`createdAt`,`updatedAt`,`serverId`) VALUES ( '2', 'channel1', 'first channel', '1', '2016-10-14 19:26:51', '2016-10-14 19:26:51', '1' );
INSERT INTO `channels`(`id`,`name`,`description`,`order`,`createdAt`,`updatedAt`,`serverId`) VALUES ( '3', 'channel3', 'third channel', '1', '2016-10-14 19:26:51', '2016-10-14 19:26:51', '1' );
-- ---------------------------------------------------------


-- CREATE INDEX "serverId" ---------------------------------
CREATE INDEX `serverId` USING BTREE ON `channels`( `serverId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "permissions" ------------------------------
CREATE TABLE `permissions` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`resourceId` Int( 11 ) NOT NULL,
	`actionId` Int( 11 ) NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `permissions_actionId_resourceId_unique` UNIQUE( `resourceId`, `actionId` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 7;
-- ---------------------------------------------------------


-- Dump data of "permissions" ------------------------------
INSERT INTO `permissions`(`id`,`name`,`createdAt`,`updatedAt`,`resourceId`,`actionId`) VALUES ( '1', 'edit server', '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '1' );
INSERT INTO `permissions`(`id`,`name`,`createdAt`,`updatedAt`,`resourceId`,`actionId`) VALUES ( '2', 'create server', '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '2' );
INSERT INTO `permissions`(`id`,`name`,`createdAt`,`updatedAt`,`resourceId`,`actionId`) VALUES ( '3', 'delete server', '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '3' );
INSERT INTO `permissions`(`id`,`name`,`createdAt`,`updatedAt`,`resourceId`,`actionId`) VALUES ( '4', 'edit message', '2016-10-14 20:01:41', '2016-10-14 20:01:41', '2', '1' );
INSERT INTO `permissions`(`id`,`name`,`createdAt`,`updatedAt`,`resourceId`,`actionId`) VALUES ( '5', 'create message', '2016-10-14 20:01:41', '2016-10-14 20:01:41', '2', '2' );
INSERT INTO `permissions`(`id`,`name`,`createdAt`,`updatedAt`,`resourceId`,`actionId`) VALUES ( '6', 'delete message', '2016-10-14 20:01:41', '2016-10-14 20:01:41', '2', '3' );
-- ---------------------------------------------------------


-- CREATE INDEX "actionId" ---------------------------------
CREATE INDEX `actionId` USING BTREE ON `permissions`( `actionId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "server_owners" ----------------------------
CREATE TABLE `server_owners` ( 
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`serverId` Int( 11 ) NOT NULL,
	`ownerId` Int( 11 ) NOT NULL,
	PRIMARY KEY ( `serverId`, `ownerId` ) )
ENGINE = InnoDB;
-- ---------------------------------------------------------


-- Dump data of "server_owners" ----------------------------
INSERT INTO `server_owners`(`createdAt`,`updatedAt`,`serverId`,`ownerId`) VALUES ( '2016-10-14 19:30:33', '2016-10-14 19:30:33', '1', '1' );
-- ---------------------------------------------------------


-- CREATE INDEX "ownerId" ----------------------------------
CREATE INDEX `ownerId` USING BTREE ON `server_owners`( `ownerId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "role_permissions" -------------------------
CREATE TABLE `role_permissions` ( 
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`roleId` Int( 11 ) NOT NULL,
	`permissionId` Int( 11 ) NOT NULL,
	PRIMARY KEY ( `roleId`, `permissionId` ) )
ENGINE = InnoDB;
-- ---------------------------------------------------------


-- Dump data of "role_permissions" -------------------------
INSERT INTO `role_permissions`(`createdAt`,`updatedAt`,`roleId`,`permissionId`) VALUES ( '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '1' );
INSERT INTO `role_permissions`(`createdAt`,`updatedAt`,`roleId`,`permissionId`) VALUES ( '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '2' );
INSERT INTO `role_permissions`(`createdAt`,`updatedAt`,`roleId`,`permissionId`) VALUES ( '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '3' );
INSERT INTO `role_permissions`(`createdAt`,`updatedAt`,`roleId`,`permissionId`) VALUES ( '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '4' );
INSERT INTO `role_permissions`(`createdAt`,`updatedAt`,`roleId`,`permissionId`) VALUES ( '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '5' );
INSERT INTO `role_permissions`(`createdAt`,`updatedAt`,`roleId`,`permissionId`) VALUES ( '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '6' );
-- ---------------------------------------------------------


-- CREATE INDEX "permissionId" -----------------------------
CREATE INDEX `permissionId` USING BTREE ON `role_permissions`( `permissionId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "server_members" ---------------------------
CREATE TABLE `server_members` ( 
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`userId` Int( 11 ) NOT NULL,
	`serverId` Int( 11 ) NOT NULL,
	PRIMARY KEY ( `userId`, `serverId` ) )
ENGINE = InnoDB;
-- ---------------------------------------------------------


-- Dump data of "server_members" ---------------------------
INSERT INTO `server_members`(`createdAt`,`updatedAt`,`userId`,`serverId`) VALUES ( '2016-10-14 19:52:01', '2016-10-14 19:52:01', '1', '1' );
INSERT INTO `server_members`(`createdAt`,`updatedAt`,`userId`,`serverId`) VALUES ( '2016-10-14 19:52:01', '2016-10-14 19:52:01', '2', '1' );
INSERT INTO `server_members`(`createdAt`,`updatedAt`,`userId`,`serverId`) VALUES ( '2016-10-14 19:52:01', '2016-10-14 19:52:01', '3', '1' );
-- ---------------------------------------------------------


-- CREATE INDEX "serverId" ---------------------------------
CREATE INDEX `serverId` USING BTREE ON `server_members`( `serverId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "user_server_roles" ------------------------
CREATE TABLE `user_server_roles` ( 
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`userId` Int( 11 ) NOT NULL,
	`serverRoleId` Int( 11 ) NOT NULL,
	PRIMARY KEY ( `userId`, `serverRoleId` ) )
ENGINE = InnoDB;
-- ---------------------------------------------------------


-- Dump data of "user_server_roles" ------------------------
INSERT INTO `user_server_roles`(`createdAt`,`updatedAt`,`userId`,`serverRoleId`) VALUES ( '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '1' );
INSERT INTO `user_server_roles`(`createdAt`,`updatedAt`,`userId`,`serverRoleId`) VALUES ( '2016-10-14 20:01:41', '2016-10-14 20:01:41', '1', '2' );
-- ---------------------------------------------------------


-- CREATE INDEX "serverRoleId" -----------------------------
CREATE INDEX `serverRoleId` USING BTREE ON `user_server_roles`( `serverRoleId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


