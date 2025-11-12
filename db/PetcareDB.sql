CREATE DATABASE  IF NOT EXISTS `petcare` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `petcare`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: petcare
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `especies`
--

DROP TABLE IF EXISTS `especies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especies`
--

LOCK TABLES `especies` WRITE;
/*!40000 ALTER TABLE `especies` DISABLE KEYS */;
INSERT INTO `especies` VALUES (1,'Perros'),(2,'Gatos'),(3,'Aves'),(4,'Reptiles'),(5,'Roedores');
/*!40000 ALTER TABLE `especies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mascotas`
--

DROP TABLE IF EXISTS `mascotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mascotas` (
  `id_usuario` int NOT NULL,
  `nombre_mascota` varchar(50) NOT NULL,
  `sexo_mascota` enum('macho','hembra') NOT NULL,
  `edad_mascota` int DEFAULT NULL,
  `notas` text,
  `id_especie` int DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_especie` (`id_especie`),
  CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`id_especie`) REFERENCES `especies` (`id`),
  CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mascotas`
--

LOCK TABLES `mascotas` WRITE;
/*!40000 ALTER TABLE `mascotas` DISABLE KEYS */;
/*!40000 ALTER TABLE `mascotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Consulta general'),(2,'Vacunación'),(3,'Desparasitación'),(4,'Esterilización'),(5,'Cuidados estéticos');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_emergencia` int DEFAULT NULL,
  `id_medico` int DEFAULT NULL,
  `id_mascota` int NOT NULL,
  `fecha` datetime NOT NULL,
  `ubicacion_inicial` varchar(100) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `notas` text,
  PRIMARY KEY (`id`),
  KEY `id_emergencia` (`id_emergencia`),
  KEY `id_medico` (`id_medico`),
  KEY `id_paciente` (`id_mascota`),
  CONSTRAINT `fk_solicitud_mascota` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id_usuario`),
  CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`id_emergencia`) REFERENCES `servicios` (`id`),
  CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `veterinarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudes`
--

LOCK TABLES `solicitudes` WRITE;
/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinario_especies_atendidas`
--

DROP TABLE IF EXISTS `veterinario_especies_atendidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinario_especies_atendidas` (
  `id_usuario` int NOT NULL,
  `id_especie` int NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_especie`),
  KEY `id_especie` (`id_especie`),
  CONSTRAINT `usuario_especie_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `veterinarios` (`id_usuario`),
  CONSTRAINT `usuario_especie_ibfk_2` FOREIGN KEY (`id_especie`) REFERENCES `especies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinario_especies_atendidas`
--

LOCK TABLES `veterinario_especies_atendidas` WRITE;
/*!40000 ALTER TABLE `veterinario_especies_atendidas` DISABLE KEYS */;
/*!40000 ALTER TABLE `veterinario_especies_atendidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinario_servicio_ofrecido`
--

DROP TABLE IF EXISTS `veterinario_servicio_ofrecido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinario_servicio_ofrecido` (
  `id_usuario` int NOT NULL,
  `id_servicio` int NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_servicio`),
  KEY `id_servicio` (`id_servicio`),
  CONSTRAINT `usuario_servicio_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `veterinarios` (`id_usuario`),
  CONSTRAINT `usuario_servicio_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinario_servicio_ofrecido`
--

LOCK TABLES `veterinario_servicio_ofrecido` WRITE;
/*!40000 ALTER TABLE `veterinario_servicio_ofrecido` DISABLE KEYS */;
/*!40000 ALTER TABLE `veterinario_servicio_ofrecido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinarios`
--

DROP TABLE IF EXISTS `veterinarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinarios` (
  `id_usuario` int NOT NULL,
  `cedula` char(10) NOT NULL,
  `horario` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `veterinarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinarios`
--

LOCK TABLES `veterinarios` WRITE;
/*!40000 ALTER TABLE `veterinarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `veterinarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hospital'
--

--
-- Dumping routines for database 'hospital'
--
/*!50003 DROP PROCEDURE IF EXISTS `get_user_fields_by_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_fields_by_id`(in id int)
begin
	
	-- DECLARE STATEMENT HAVE A LOCAL SCOPE, just inside a block of code and not outside of a function
	DECLARE is_pacient BOOLEAN DEFAULT FALSE;
    SELECT IF( EXISTS (SELECT 1 FROM pacientes WHERE pacientes.id_usuario = id) , 1, 0) INTO is_pacient;
    
    -- used to assign values to variables(either local or session variables)It 
    -- can be used outside of stored procedures as well, for session variables or local procedure variables.
    -- SET
    -- variables with @example has a global scope but only during the session of query

    IF(is_pacient) THEN
		SELECT
			usuarios.id, 
			usuarios.nombre,
			usuarios.apellidos,
			usuarios.email,
			usuarios.telefono,
            
            pacientes.curp,
            pacientes.edad,
            pacientes.sexo,
            pacientes.peso,
            pacientes.estatura,
            'paciente' as tipo
		FROM usuarios
        INNER JOIN pacientes on pacientes.id_usuario = usuarios.id
		WHERE usuarios.id = id LIMIT 1
		;
	ELSE
		SELECT
			usuarios.id, 
			usuarios.nombre,
			usuarios.apellidos,
			usuarios.email,
			usuarios.telefono,
            
            medicos.cedula,
            especialidades.nombre as especialidad,
            'medico' as tipo
		FROM usuarios
        INNER JOIN medicos on medicos.id_usuario = usuarios.id
        INNER JOIN especialidades ON especialidades.id = medicos.id_especialidad
		WHERE usuarios.id = id LIMIT 1
		;
	END IF;

    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-10 20:41:17
