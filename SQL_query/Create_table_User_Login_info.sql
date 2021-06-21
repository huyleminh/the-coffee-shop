CREATE SCHEMA IF NOT EXISTS `heroku_a51da3167c7e5af` DEFAULT CHARACTER SET utf8 ;
USE `heroku_a51da3167c7e5af` ;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_info` (
  `ID` CHAR(8) NOT NULL,
  `NAME` NVARCHAR(50) NULL DEFAULT NULL,
  `ADDRESS` NVARCHAR(150) NULL DEFAULT NULL,
  `PHONE_NUMBER` VARCHAR(12) default NULL,
  `GENDER` BIT(1) NULL DEFAULT NULL,
  `CREATED_AT` timestamp NOT NULL,
  `UPDATED_AT` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_login` (
  `ID` CHAR(8) NOT NULL DEFAULT '',
  `USERNAME` VARCHAR(50) NOT NULL,
  `PASSWORD` VARCHAR(50) NOT NULL,
  `ROLE_ID` SMALLINT(1) NULL DEFAULT NULL,
  `UPDATED_AT` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_user_login_user_info`
    FOREIGN KEY (`ID`)
    REFERENCES `heroku_a51da3167c7e5af`.`user_info` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SELECT * from  `user_info`
where `user_info`.`ID`=`user_login`.`ID`;


update `user_login`
set `user_login`.`Created_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG1";

update `user_login`
set `user_login`.`Created_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG2";

update `user_login`
set `user_login`.`Created_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG3";

update `user_login`
set `user_login`.`Created_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG4";

update `user_login`
set `user_login`.`Created_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG5";