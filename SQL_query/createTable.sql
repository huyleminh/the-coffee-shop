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


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product`
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product` (
  `id` VARCHAR(36) NOT NULL,
  `name` NVARCHAR(150) NULL,
  `image` TEXT NULL,
  `price` INT NULL,
  `description` TEXT NULL,
  `discountId` VARCHAR(36) NULL,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_category`product_category
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product_category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `categoryId` VARCHAR(36) NOT NULL,
  `productId` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `FK_INDEX_PRODUCT` (`productId` ASC),
  INDEX `FK_INDEX_CATEGORY` (`categoryId` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`category`
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`category` (
  `id` VARCHAR(36) NOT NULL,
  `name` NVARCHAR(60) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- --------------------------
-- ADD FOREIGN PRODUCT TO PRODUCT_CATEGORY
-- ----------------------
  -- --------------------------
-- ADD FOREIGN CATEGORY TO PRODUCT_CATEGORY
-- ----------------------
ALTER TABLE `heroku_a51da3167c7e5af`.`product_category` 
DROP COLUMN `id`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`categoryId`, `productId`),
DROP INDEX `FK_INDEX_PRODUCT` ,
ADD INDEX `fk_product_category_category1_idx` (`productId` ASC),
DROP INDEX `FK_INDEX_CATEGORY` ,
ADD INDEX `fk_product_category_product1_idx` (`categoryId` ASC),
DROP INDEX `id_UNIQUE` ;
;
ALTER TABLE `heroku_a51da3167c7e5af`.`product_category` 
ADD CONSTRAINT `fk_product_category_category1`
  FOREIGN KEY (`categoryId`)
  REFERENCES `heroku_a51da3167c7e5af`.`category` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_product_category_product1`
  FOREIGN KEY (`productId`)
  REFERENCES `heroku_a51da3167c7e5af`.`product` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  
-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`category`
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product_rating` (
  `productId` VARCHAR(36) NOT NULL,
  `totalStar` INT NULL,
  `totalRating` INT NULL,
  PRIMARY KEY (`productId`),
  CONSTRAINT `FK_PRODUC_RATING`
    FOREIGN KEY (`productId`)
    REFERENCES `heroku_a51da3167c7e5af`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_rating`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product_rating` (
  `productId` VARCHAR(36) NOT NULL,
  `totalStar` INT NULL,
  `totalRating` INT NULL,
  PRIMARY KEY (`productId`),
  CONSTRAINT `FK_PRODUC_RATING`
    FOREIGN KEY (`productId`)
    REFERENCES `heroku_a51da3167c7e5af`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_rating`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`discount` (
  `id` VARCHAR(36) NOT NULL,
  `percent` FLOAT NULL,
  `active` BIT NULL,
  `startDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `endDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_DISCOUNT`
    FOREIGN KEY (`id`)
    REFERENCES `heroku_a51da3167c7e5af`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    






