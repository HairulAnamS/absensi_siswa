/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 8.0.39 : Database - absensi_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`absensi_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `absensi_db`;

/*Table structure for table `absensi` */

DROP TABLE IF EXISTS `absensi`;

CREATE TABLE `absensi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tanggal` date NOT NULL,
  `siswa_id` int NOT NULL,
  `kelas_id` int NOT NULL,
  `kehadiran` enum('Hadir','Ijin','Sakit','Alpha') NOT NULL,
  `keterangan` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `siswa_id` (`siswa_id`),
  KEY `kelas_id` (`kelas_id`),
  CONSTRAINT `absensi_ibfk_1` FOREIGN KEY (`siswa_id`) REFERENCES `siswa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `absensi_ibfk_2` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `absensi` */

insert  into `absensi`(`id`,`tanggal`,`siswa_id`,`kelas_id`,`kehadiran`,`keterangan`) values 
(1,'2025-07-14',2,2,'Hadir',''),
(2,'2025-07-14',1,2,'Ijin','Ijin ada surat');

/*Table structure for table `kelas` */

DROP TABLE IF EXISTS `kelas`;

CREATE TABLE `kelas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kelas` */

insert  into `kelas`(`id`,`kode`,`nama`) values 
(2,'VIIA','Kelas 7A'),
(3,'VIIB','Kelas 7B'),
(4,'VII-C','Kelas 7 C'),
(5,'VII-A','Kelas 8 A'),
(6,'VIII-B','Kelas 8 B');

/*Table structure for table `siswa` */

DROP TABLE IF EXISTS `siswa`;

CREATE TABLE `siswa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nis` varchar(20) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jk` enum('L','P') NOT NULL,
  `kelas_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `kelas_id` (`kelas_id`),
  CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `siswa` */

insert  into `siswa`(`id`,`nis`,`nama`,`jk`,`kelas_id`) values 
(1,'35211','Hamdan ATT','L',2),
(2,'35211','Anggita Putri Tanjung','P',2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
