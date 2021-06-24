CREATE SCHEMA IF NOT EXISTS `heroku_a51da3167c7e5af` DEFAULT CHARACTER SET utf8 ;
USE `heroku_a51da3167c7e5af` ;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_info` (
  `id_user` CHAR(8) NOT NULL,
  `name` NVARCHAR(50) NULL DEFAULT NULL,
  `Address` NVARCHAR(150) NULL DEFAULT NULL,
  `Phone_number` VARCHAR(12) NOT NULL,
  `gender` BIT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
SELECT `user_info`.`id_user`,
    `user_info`.`name`,
    `user_info`.`Address`,
    `user_info`.`Phone_number`,
    `user_info`.`gender`
FROM `heroku_a51da3167c7e5af`.`user_info`;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_login` (
  `ID` CHAR(8) NOT NULL DEFAULT '',
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `role_id` SMALLINT(6) NULL DEFAULT NULL,
  `Create_AT` timestamp NOT NULL,
  `Updated_At` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_user_login_user_info`
    FOREIGN KEY (`ID`)
    REFERENCES `heroku_a51da3167c7e5af`.`user_info` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



