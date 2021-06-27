CREATE SCHEMA IF NOT EXISTS `heroku_a51da3167c7e5af` DEFAULT CHARACTER SET utf8;
USE `heroku_a51da3167c7e5af`;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`USER_INFO` (
  `id` CHAR(7) NOT NULL,
  `fullname` VARCHAR(50) NOT NULL,
  `address` VARCHAR(150) NOT NULL,
  `phoneNumber` VARCHAR(10) NOT NULL,
  `gender` BIT(1) NOT NULL,
  `updatedAt` TIMESTAMP NOT NULL,
  `createdAt` TIMESTAMP NULL,
  
  CONSTRAINT `PK_USER_INFO` PRIMARY KEY (`id`),
  CONSTRAINT `UC_USER_INFO` UNIQUE (`phoneNumber`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`USER_LOGIN` (
  `id` CHAR(7) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `role` SMALLINT(1) NOT NULL DEFAULT 3,
  `updatedAt` TIMESTAMP NOT NULL,
  
  CONSTRAINT `PK_USER_LOGIN` PRIMARY KEY (`id`),
  CONSTRAINT `UC_USER_LOGIN` UNIQUE (`username`),
  CONSTRAINT `FK_USER_LONG_USER_INFO` FOREIGN KEY (`id`)
    REFERENCES `heroku_a51da3167c7e5af`.`USER_INFO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
