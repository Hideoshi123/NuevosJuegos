-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: narazaky
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `nombre` varchar(30) DEFAULT NULL,
  `apellido` varchar(30) DEFAULT NULL,
  `ci` varchar(10) NOT NULL,
  `fecha_n` date DEFAULT NULL,
  `direccion` varchar(30) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `salario` int DEFAULT NULL,
  `superci` varchar(10) DEFAULT NULL,
  `dno` int DEFAULT NULL,
  PRIMARY KEY (`ci`),
  KEY `dno` (`dno`),
  KEY `superci` (`superci`),
  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`dno`) REFERENCES `dapartamento` (`dnumero`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`superci`) REFERENCES `empleado` (`ci`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES ('juan','polo','123456789','1959-03-03','Sucre 7-12','M',3000,'333445555',5),('Humberto','Pons','333445555','1960-12-25','Bolivar 5-67','M',4000,'888665555',5),('Marcia','Mora','453453453','1960-03-29','Colombia 4-23','F',2500,'333445555',5),('Pablo','Castro','666884444','1955-09-15','Bolivar 1-50','M',3800,'333445555',5),('Jaime','Perez','888665555','1957-04-05','Sangurima 8-34','M',5500,NULL,1),('Elena','Tapia','987654321','1961-05-03','Ordonez 7-29','F',4300,'888665555',4),('Manuel','Bonilla','987987987','1958-07-16','B. Malo 1-10','M',2500,'987654321',4),('Irma','Vega','999887777','1950-11-13','P. Cordova 3-45','F',2500,'987654321',4);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-30 21:08:36
