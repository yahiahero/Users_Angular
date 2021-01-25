-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `default_city` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `default_city`, `password`) VALUES
(1, 'benaaa', 'abbbb', 'biskra', '$2a$10$Dr0Ci9f9Ndn/n2j2jJpwheJlfiHvUowjJZTQwR/PDj3MuPDspEM9S'),
(2, 'mamou', 'benabba', 'algiers', '$2a$10$7674jl7kHFxi1Di/H2lMx.ce9m1t4vb9f4Dv5u1oHj7.LVIHWSbo2'),
(3, 'foufou', 'sghiira', 'france', '$2a$10$1unGHD/Y0UtB0irPzbyB0O..b5nBZ4AL82eDkM/z2xBYmAKk.AjqC'),
(4, 'islem', 'benn', 'paris', '$2a$10$YtlmlS7KY9xW0yWn5jxrJeDmIruH.zUfqfEOnNaxeI1sKV6riJbXi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
