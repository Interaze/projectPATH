-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 07, 2019 at 07:40 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Final_Project`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `PK` int(10) UNSIGNED NOT NULL,
  `UserName` varchar(30) NOT NULL,
  `Email` varchar(55) NOT NULL,
  `FirstName` varchar(75) NOT NULL,
  `LastName` varchar(75) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Folder` varchar(255) NOT NULL COMMENT 'Stores Directories for Folders',
  `isAdmin` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`PK`, `UserName`, `Email`, `FirstName`, `LastName`, `Password`, `Folder`, `isAdmin`) VALUES
(16, 'f', 'cws3p4@mail.missouri.edu', 'Christopher', 'Scully', 'f', '../Users/f', 0),
(18, 'G', 'cws3p4@mail.missouri.edu', 'Christopher', 'Scully', 'f', '../Users/G', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`PK`),
  ADD UNIQUE KEY `UserName` (`UserName`),
  ADD UNIQUE KEY `Folder` (`Folder`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `PK` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
