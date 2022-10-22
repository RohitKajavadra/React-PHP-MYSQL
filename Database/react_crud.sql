-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2022 at 08:44 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`id`, `name`, `email`, `subject`, `message`, `updated_at`) VALUES
(1, 'shyam', 'shyam@gmail.com', 'test', 'only for test', '2022-08-22 06:42:12'),
(2, 'rameswer', 'ram@testtt.com', 'test', 'test etetts test', '2022-08-22 06:49:22'),
(3, 'henil', 'henil@gmail.com', 'services', 'this service is not work properly', '2022-08-22 08:41:38'),
(4, 'jhgdsjgjg', 'test@test.com', 'test', 'test', '2022-08-22 13:39:44'),
(5, 'vcvcv ', 'gfdhg@jhgdjh.ckjlkj', 'cxxxx', 'cccccc', '2022-08-23 08:39:33');

-- --------------------------------------------------------

--
-- Table structure for table `tblorder`
--

CREATE TABLE `tblorder` (
  `orderId` int(255) NOT NULL,
  `uname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `sname` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imgUrl` varchar(255) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblorder`
--

INSERT INTO `tblorder` (`orderId`, `uname`, `email`, `address`, `sname`, `price`, `description`, `imgUrl`, `paymentMethod`, `status`, `updated_at`) VALUES
(6, 'henil', 'henil@gmail.com', 'surat,gujrat', 'ERP for small bussiness', 3999, 'This is small bussiness software', 'https://i.ibb.co/HX1p54J/software.png', 'card', 'Done', '2022-08-22 14:50:29'),
(7, 'karunesh', 'aaa@aaa.com', '22,hari nagar,ak road,surat.', 'SAAS', 4999, 'SAAS is a Software As a Service for all bussiness.', 'https://i.ibb.co/DKpYsbq/software5.png', 'card', 'On going', '2022-08-22 15:09:54'),
(8, 'iris', 'iris@gmail.com', 'surat', 'ERP for small bussiness', 3999, 'This is small bussiness software', 'https://i.ibb.co/HX1p54J/software.png', 'card', 'Done', '2022-08-22 15:12:25'),
(10, 'dax', 'dax@gmail.com', 'hjdghksgkh', 'ttttttttttttttttttttttt', 10000, 'dsssssssssssss', 'https://i.ibb.co/K7BBJZG/6f559d88-87ac-4d93-8aff-5d76358da7a3.jpg', 'card', 'Done', '2022-08-23 08:41:42'),
(11, 'lax', 'lax@test.com', 'surat', 'ERP for small bussiness', 3999, 'This is small bussiness software', 'https://i.ibb.co/HX1p54J/software.png', 'card', 'Pending', '2022-08-29 17:48:40'),
(12, 'aaaa', 'aaa@aaa.com', 'hfahfhsf', 'ERP for small bussiness', 3999, 'This is small bussiness software', 'https://i.ibb.co/HX1p54J/software.png', 'card', 'On going', '2022-10-22 05:43:07');

-- --------------------------------------------------------

--
-- Table structure for table `tblreview`
--

CREATE TABLE `tblreview` (
  `_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `imgUrl` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblreview`
--

INSERT INTO `tblreview` (`_id`, `name`, `email`, `imgUrl`, `address`, `description`, `updated_at`) VALUES
(11, 'shyam', 'shyam@gmail.com', '/static/media/user2.8d71892cb40131d6907f.png', '18,bhavani nagar,l.h road,surat,matawadi', 'just for testing purpose', '2022-08-21 13:04:22'),
(13, 'henil', 'henil@gmail.com', 'https://i.ibb.co/8zz0dYR/pic-1.png', 'surat,gujarat', 'this software help me to find bussiness query.', '2022-08-22 08:48:45'),
(14, 'rohit 123', 'rk@gmailydtyty.comm', '/static/media/user2.8d71892cb40131d6907f.png', 'navasari,gujrat', 'this website contains more information of new company keep it up.', '2022-08-22 14:55:00'),
(15, 'karunesh', 'aaa@aaa.com', 'https://i.ibb.co/h8tF9HS/pic-5.png', 'mumbai,maharastra', 'awesome service providing me thanks.', '2022-08-22 15:09:20'),
(16, 'iris', 'iris@gmail.com', '/static/media/user2.8d71892cb40131d6907f.png', 'delhi,india', 'SAAS is fully customized i realy thankfull ', '2022-08-22 15:13:27'),
(17, 'lax', 'lax@test.com', 'https://i.ibb.co/mBcQfGN/teacher-5.png', 'bengaluru', 'this website helpful for me.', '2022-08-22 15:18:12'),
(18, 'dax', 'dax@gmail.com', 'https://i.ibb.co/nDRh974/home-slide-2.jpg', 'surat', 'nice 12344 gfdjgfkjgfjg', '2022-08-23 07:21:47');

-- --------------------------------------------------------

--
-- Table structure for table `tblservice`
--

CREATE TABLE `tblservice` (
  `id` int(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `imgUrl` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblservice`
--

INSERT INTO `tblservice` (`id`, `service_name`, `description`, `price`, `imgUrl`, `updated_at`) VALUES
(26, 'ERP for small bussiness', 'This is small bussiness software', 3499, 'https://i.ibb.co/HX1p54J/software.png', '2022-08-22 14:40:14'),
(27, 'SAAS', 'SAAS is a Software As a Service for all bussiness.', 4999, 'https://i.ibb.co/DKpYsbq/software5.png', '2022-08-22 14:42:58'),
(28, 'Scoro', ' Scoro contains features  to manage company.', 7499, 'https://i.ibb.co/m6P0Rc8/software4.png', '2022-08-22 14:44:54'),
(29, 'ERP for bussines', 'this is only test ', 20000, 'https://i.ibb.co/Z233s4b/software3.jpg', '2022-08-23 07:18:10');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imgUrl` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `name`, `email`, `password`, `imgUrl`, `updated_at`, `isAdmin`) VALUES
(12, 'rohit123', 'rk@gmailydtyty.comm', '1234123', '', '2022-08-16 03:07:09', 0),
(38, 'rohit', 'rohit@gmail.com', '123456', 'https://i.ibb.co/JmxVrbh/pic-1.png', '2022-08-16 16:20:56', 1),
(46, 'aaaa', 'aaa@aaa.com', 'aaaa', 'https://i.ibb.co/h8tF9HS/pic-5.png', '2022-08-17 16:35:10', 0),
(603, 'shyam', 'shyam@gmail.com', '1234', '', '2022-08-18 10:29:21', 0),
(605, 'ram', 'ram@test.com', '123456', '', '2022-08-21 10:23:33', 1),
(606, 'lax', 'lax@test.com', '123456', 'https://i.ibb.co/mBcQfGN/teacher-5.png', '2022-08-21 11:11:49', 0),
(608, 'iris', 'iris@gmail.com', '123456', '', '2022-08-22 08:24:59', 0),
(609, 'henil', 'henil@gmail.com', '1234', 'https://i.ibb.co/8zz0dYR/pic-1.png', '2022-08-22 08:39:24', 0),
(610, 'shubh', 'shubh@gmail.com', '1234', '', '2022-08-22 13:50:32', 0),
(611, 'dax', 'dax@gmail.com', '123456', 'https://i.ibb.co/nDRh974/home-slide-2.jpg', '2022-08-23 07:19:10', 0),
(612, 'testing', 'testing@gmail.com', '123456', '', '2022-08-23 07:22:54', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblorder`
--
ALTER TABLE `tblorder`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `tblreview`
--
ALTER TABLE `tblreview`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `tblservice`
--
ALTER TABLE `tblservice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tblorder`
--
ALTER TABLE `tblorder`
  MODIFY `orderId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tblreview`
--
ALTER TABLE `tblreview`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tblservice`
--
ALTER TABLE `tblservice`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=613;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
