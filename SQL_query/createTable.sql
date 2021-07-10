CREATE SCHEMA IF NOT EXISTS `heroku_a51da3167c7e5af` DEFAULT CHARACTER SET utf8;
USE `heroku_a51da3167c7e5af`;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_info` (
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
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_login` (
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
  `name` NVARCHAR(150) NOT NULL,
  `image` TEXT DEFAULT NULL,
  `price` INT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `discountId` VARCHAR(36) DEFAULT NULL,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `PK_PRODUCT` PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`category`
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`category` (
  `id` VARCHAR(36) NOT NULL,
  `name` NVARCHAR(60) NOT NULL,
  CONSTRAINT `PK_CATEGORY` PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_category`
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product_category` (
  `categoryId` VARCHAR(36) NOT NULL,
  `productId` VARCHAR(36) NOT NULL,
  CONSTRAINT `PK_PRODUCT_CATEGORY` PRIMARY KEY (`categoryId`, `productId`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_rating`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`discount` (
  `id` VARCHAR(36) NOT NULL,
  `percent` FLOAT NULL,
  `active` BIT NOT NULL,
  `startDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `endDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `PK_DISCOUNT` PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_rating`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product_rating` (
  `productId` VARCHAR(36) NOT NULL,
  `totalStar` INT NULL,
  `totalRating` INT NULL,
  CONSTRAINT `PK_PRODUCT_RATING` PRIMARY KEY (`productId`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
    

ALTER TABLE `heroku_a51da3167c7e5af`.`product_category`
ADD CONSTRAINT FK_PRODUCT_CATEGORY_PRODUCT
FOREIGN KEY (productID)
REFERENCES `heroku_a51da3167c7e5af`.`product`(id);

ALTER TABLE `heroku_a51da3167c7e5af`.`product_category`
ADD CONSTRAINT FK_PRODUCT_CATEGORY_CATEGORY1
FOREIGN KEY (categoryID)
REFERENCES `heroku_a51da3167c7e5af`.`category`(id);

ALTER TABLE `heroku_a51da3167c7e5af`.`product_rating`
ADD CONSTRAINT FK_PRODUCT_RATING_PRODUCT
FOREIGN KEY (productID)
REFERENCES `heroku_a51da3167c7e5af`.`product`(id);

ALTER TABLE `heroku_a51da3167c7e5af`.`product`
ADD CONSTRAINT FK_PRODUCT_DISCOUNT
FOREIGN KEY (discountID)
REFERENCES `heroku_a51da3167c7e5af`.`discount`(id);
    