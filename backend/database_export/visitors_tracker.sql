-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2024 at 11:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `visitors_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `clock_in_logs`
--

CREATE TABLE `clock_in_logs` (
  `user_id` int(4) NOT NULL,
  `entry_time` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `exit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clock_in_logs`
--

INSERT INTO `clock_in_logs` (`user_id`, `entry_time`, `exit_time`) VALUES
(0, '2024-09-20 12:12:00.440000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` char(50) NOT NULL,
  `PIN` varchar(100) NOT NULL,
  `registration_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `PIN`, `registration_time`) VALUES
('E37B0', 'Jake Harper', '$2b$10$ZZX1m/7qgo5w.gKacJxWS.bDO/4ypLAQBQDYfzSNFKF3a3uB.Kxmm', '2024-09-20 12:06:16'),
('11578', 'Jack Ryan', '$2b$10$Rkc1oMaTxgspnEarqHI8PeI.H17Xcwsie0Zu5czqkhWVqwunAUjVq', '2024-09-20 12:08:06'),
('B39CA', 'James Greer', '$2b$10$33n/z0x3WNVXGh1CX4bJRODntRPHjwuTCEonxFFWrrQ4KHwY0q.iy', '2024-09-20 12:11:36');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
