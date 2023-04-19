-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2023 at 03:04 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `market`
--

-- --------------------------------------------------------

--
-- Table structure for table `market_ex`
--

CREATE TABLE `market_ex` (
  `itemid` int(11) NOT NULL,
  `itempos` int(11) NOT NULL,
  `item_name` longtext DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  `date_sale` datetime DEFAULT NULL,
  `seller` varchar(30) DEFAULT NULL,
  `date_buy` datetime DEFAULT NULL,
  `buyer` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `market_ex`
--

INSERT INTO `market_ex` (`itemid`, `itempos`, `item_name`, `price`, `image`, `state`, `date_sale`, `seller`, `date_buy`, `buyer`) VALUES
(17, 1, 'Skeleton Knife | Forest DDPAT', 18000, 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwPjNfThW49KJnJm0k_PkMq_ummJW4NFOhujT8om73gXtqBY_Y2jzd9SdegQ4NVrY_gDvlO_vgJ7p7c-fmyFg7nR343ndnwv330_Ui2tZJw/360fx360f', 'รอคำสั่งซื้อ', '2023-04-18 17:30:33', 'tree', NULL, NULL),
(18, 2, 'M9 Bayonet | Gamma Doppler', 3100, 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjzMrbcl1RV59VhhuzTypz9iUex-iwwOj6rYOnJI0RpNEbU81m-krzt18S8tcjIwCNnsnEi4S6InhzmgU1KbeBsgfeYHFSfVPYcAuDcUfGHAshI/360fx360f', 'รอคำสั่งซื้อ', '2023-04-18 17:30:33', 'tree', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `money` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `money`) VALUES
('dun', '456', 100),
('memem', '1323', 0),
('tree', '1234', 200),
('tree2', '12345', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_inventory`
--

CREATE TABLE `user_inventory` (
  `id_int` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `inventory` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`inventory`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_inventory`
--

INSERT INTO `user_inventory` (`id_int`, `username`, `inventory`) VALUES
(1, 'tree', '[{\"itempos\":1,\"itemid\":17,\"name\":\"Skeleton Knife | Forest DDPAT\",\"price\":18000,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwPjNfThW49KJnJm0k_PkMq_ummJW4NFOhujT8om73gXtqBY_Y2jzd9SdegQ4NVrY_gDvlO_vgJ7p7c-fmyFg7nR343ndnwv330_Ui2tZJw/360fx360f\",\"description\":\"The Forest DDPAT is a skin for the Skeleton Knife. It was added to the game in the Arms Deal update on August 1, 2013.\",\"sold\":1},{\"itempos\":2,\"itemid\":18,\"name\":\"M9 Bayonet | Gamma Doppler\",\"price\":3100,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjzMrbcl1RV59VhhuzTypz9iUex-iwwOj6rYOnJI0RpNEbU81m-krzt18S8tcjIwCNnsnEi4S6InhzmgU1KbeBsgfeYHFSfVPYcAuDcUfGHAshI/360fx360f\",\"description\":\"The Gamma Doppler is a skin for the M9 Bayonet. It was added to the game in the Arms Deal update on August 1, 2013. It is a part of the Gamma Doppler Collection. It is a recolor of the Gamma Doppler skin for the M9 Bayonet.\",\"sold\":1},{\"itempos\":3,\"itemid\":3,\"name\":\"M4A4 Howl field tested\",\"price\":310000,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOvEpIj0jAbkqEE_ZD3xctLGJAE_Zw7U-QTowefth8TpvM_InHZh6XQ8pSGKWYJAoJI/360fx360f\",\"description\":\"The Howl is a skin for the M4A4. It was added to the game in the Arms Deal update on August 1, 2013. It is a part of the Howl Collection. It is a recolor of the Howl skin for the M4A1-S.\",\"sold\":0},{\"itempos\":4,\"itemid\":4,\"name\":\"M4A4 Asiimov minimal wear\",\"price\":8100,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOvEpIj0jAbkqEE_ZD3xctLGJAE_Zw7U-QTowefth8TpvM_InHZh6XQ8pSGKWYJAoJI/360fx360f\",\"description\":\"The Asiimov is a skin for the M4A4. It was added to the game in the Arms Deal update on August 1, 2013. It is a part of the Asiimov Collection. It is a recolor of the Asiimov skin for the M4A1-S.\",\"sold\":0},{\"itempos\":5,\"itemid\":5,\"name\":\"M4A1-S Guardian factory new\",\"price\":3100,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alfqjuk2dU78R_ntbN_Iv9nGu4qgE7NnfyddXHIAY-Z1jW_lm-yO--1pO_vsmcz3ow7HQl53-PmETjiBBMa-Nrm7XAHnr9YjkW/360fx360f\",\"description\":\"The Guardian is a skin for the M4A1-S. It was added to the game in the Arms Deal update on August 1, 2013. It is a part of the Guardian Collection. It is a recolor of the Guardian skin for the M4A1-S.\",\"sold\":0}]'),
(2, 'dun', '[{\"itempos\":1,\"itemid\":174,\"name\":\"Skeleton Knife | Forest DDPAT\",\"price\":18000,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwPjNfThW49KJnJm0k_PkMq_ummJW4NFOhujT8om73gXtqBY_Y2jzd9SdegQ4NVrY_gDvlO_vgJ7p7c-fmyFg7nR343ndnwv330_Ui2tZJw/360fx360f\",\"description\":\"The Forest DDPAT is a skin for the Skeleton Knife. It was added to the game in the Arms Deal update on August 1, 2013.\",\"sold\":0},{\"itempos\":2,\"itemid\":148,\"name\":\"M9 Bayonet | Gamma Doppler\",\"price\":3100,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjzMrbcl1RV59VhhuzTypz9iUex-iwwOj6rYOnJI0RpNEbU81m-krzt18S8tcjIwCNnsnEi4S6InhzmgU1KbeBsgfeYHFSfVPYcAuDcUfGHAshI/360fx360f\",\"description\":\"The Gamma Doppler is a skin for the M9 Bayonet. It was added to the game in the Arms Deal update on August 1, 2013. It is a part of the Gamma Doppler Collection. It is a recolor of the Gamma Doppler skin for the M9 Bayonet.\",\"sold\":0},{\"itempos\":3,\"itemid\":123,\"name\":\"M4A4 Howl field tested\",\"price\":310000,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOvEpIj0jAbkqEE_ZD3xctLGJAE_Zw7U-QTowefth8TpvM_InHZh6XQ8pSGKWYJAoJI/360fx360f\",\"description\":\"The Howl is a skin for the M4A4. It was added to the game in the Arms Deal update on August 1, 2013. It is a part of the Howl Collection. It is a recolor of the Howl skin for the M4A1-S.\",\"sold\":0},{\"itempos\":4,\"itemid\":54,\"name\":\"M4A4 Asiimov minimal wear\",\"price\":8100,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOvEpIj0jAbkqEE_ZD3xctLGJAE_Zw7U-QTowefth8TpvM_InHZh6XQ8pSGKWYJAoJI/360fx360f\",\"description\":\"The Asiimov is a skin for the M4A4. It was added to the game in the Arms Deal update on August 1, 2013. It is a part of the Asiimov Collection. It is a recolor of the Asiimov skin for the M4A1-S.\",\"sold\":0},{\"itempos\":5,\"itemid\":15,\"name\":\"M4A1-S Guardian factory new\",\"price\":3100,\"image\":\"https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alfqjuk2dU78R_ntbN_Iv9nGu4qgE7NnfyddXHIAY-Z1jW_lm-yO--1pO_vsmcz3ow7HQl53-PmETjiBBMa-Nrm7XAHnr9YjkW/360fx360f\",\"description\":\"The Guardian is a skin for the M4A1-S. It was added to the game in the Arms Deal update on August 1, 2013. It is a part of the Guardian Collection. It is a recolor of the Guardian skin for the M4A1-S.\",\"sold\":0}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `market_ex`
--
ALTER TABLE `market_ex`
  ADD PRIMARY KEY (`itemid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `user_inventory`
--
ALTER TABLE `user_inventory`
  ADD PRIMARY KEY (`id_int`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `market_ex`
--
ALTER TABLE `market_ex`
  MODIFY `itemid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT for table `user_inventory`
--
ALTER TABLE `user_inventory`
  MODIFY `id_int` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_inventory`
--
ALTER TABLE `user_inventory`
  ADD CONSTRAINT `user_inventory_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
