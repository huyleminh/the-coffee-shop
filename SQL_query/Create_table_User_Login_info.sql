CREATE SCHEMA IF NOT EXISTS `heroku_a51da3167c7e5af` DEFAULT CHARACTER SET utf8 ;
USE `heroku_a51da3167c7e5af` ;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_info` (
  `ID` CHAR(8) NOT NULL,
  `name` NVARCHAR(50) NULL DEFAULT NULL,
  `Address` NVARCHAR(150) NULL DEFAULT NULL,
  `Phone_number` VARCHAR(12) NOT NULL,
  `gender` BIT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_login` (
  `ID` CHAR(8) NOT NULL DEFAULT '',
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `role_id` SMALLINT(1) NULL DEFAULT NULL,
  `Created_AT` timestamp NOT NULL,
  `Updated_At` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_user_login_user_info`
    FOREIGN KEY (`ID`)
    REFERENCES `heroku_a51da3167c7e5af`.`user_info` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SELECT* from  `user_info`
join `user_login` on `user_info`.`ID`=`user_login`.`ID`;

