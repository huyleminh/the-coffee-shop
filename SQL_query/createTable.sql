CREATE SCHEMA IF NOT EXISTS `heroku_a51da3167c7e5af` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_bin;
USE `heroku_a51da3167c7e5af`;

-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_info` (
  `id` CHAR(7) NOT NULL,
  `fullname` VARCHAR(50) NOT NULL,
  `address` VARCHAR(150) NOT NULL,
  `phoneNumber` VARCHAR(10) NOT NULL,
  `gender` TINYINT(1) NOT NULL,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT `PK_USER_INFO` PRIMARY KEY (`id`),
  CONSTRAINT `UC_USER_INFO` UNIQUE (`phoneNumber`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
DEFAULT COLLATE = utf8mb4_bin;


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`user_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_a51da3167c7e5af`.`user_login` (
  `id` CHAR(7) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `role` SMALLINT(1) NOT NULL DEFAULT 3,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  CONSTRAINT `PK_USER_LOGIN` PRIMARY KEY (`id`),
  CONSTRAINT `UC_USER_LOGIN` UNIQUE (`username`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
DEFAULT COLLATE = utf8mb4_bin;


ALTER TABLE `heroku_a51da3167c7e5af`.`user_login`
ADD CONSTRAINT FK_USER_LONG_USER_INFO
FOREIGN KEY (id)
REFERENCES `heroku_a51da3167c7e5af`.`user_info`(id);


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product`
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `image` VARCHAR(50) DEFAULT NULL,
  `price` INT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `discountId` VARCHAR(36) DEFAULT NULL,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `PK_PRODUCT` PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
DEFAULT COLLATE = utf8mb4_bin;


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`category`
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`category` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  CONSTRAINT `PK_CATEGORY` PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
DEFAULT COLLATE = utf8mb4_bin;


-- -----------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_category`
-- -----------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product_category` (
  `categoryId` VARCHAR(36) NOT NULL,
  `productId` VARCHAR(36) NOT NULL,
  CONSTRAINT `PK_PRODUCT_CATEGORY` PRIMARY KEY (`categoryId`, `productId`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
DEFAULT COLLATE = utf8mb4_bin;


-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_rating`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`discount` (
  `id` VARCHAR(36) NOT NULL,
  `percent` FLOAT NULL,
  `active` TINYINT(1) NOT NULL,
  `startDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `endDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `PK_DISCOUNT` PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
DEFAULT COLLATE = utf8mb4_bin;


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
DEFAULT CHARACTER SET = utf8mb4
DEFAULT COLLATE = utf8mb4_bin;
-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`ingredient`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`ingredient` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(50) NULL,
  `quantity` FLOAT NULL,
  `unitOfMeasurement` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;
-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_ingredient`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product_ingredient` (
  `productId` VARCHAR(36) NOT NULL,
  `ingredientId` VARCHAR(36) NOT NULL,
  UNIQUE INDEX `productId_UNIQUE` (`productId` ASC),
  UNIQUE INDEX `ingredientId_UNIQUE` (`ingredientId` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;

-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`cart`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`cart` (
  `productId` VARCHAR(36) NOT NULL,
  `userId` CHAR(7) NOT NULL,
  `quantity` INT NULL,
  PRIMARY KEY (`productId`, `userId`),
  UNIQUE INDEX `productId_UNIQUE` (`productId` ASC),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;

-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`wishlist`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`wishlist` (
  `productId` VARCHAR(36) NOT NULL,
  `userId` CHAR(7) NOT NULL,
  PRIMARY KEY (`productId`, `userId`),
  UNIQUE INDEX `productId_UNIQUE` (`productId` ASC),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;
-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`order`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`order` (
  `id` VARCHAR(36) NOT NULL,
  `userId` CHAR(7) NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `status` TINYINT(1) NOT NULL,
  `isPaid` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;
-- ------------------------------------------------------
-- Table `heroku_a51da3167c7e5af`.`product_order`
-- ------------------------------------------------------
CREATE TABLE `heroku_a51da3167c7e5af`.`product_order` (
  `productId` VARCHAR(36) NOT NULL,
  `orderId` VARCHAR(36) NOT NULL,
  `quantity` INT NOT NULL,
  `price` FLOAT NOT NULL,
  PRIMARY KEY (`productId`, `orderId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;
-- ------------------------------------------------------
-- create FOREIGN KEY
-- ------------------------------------------------------
-- FK_PRODUCT_CATEGORY-
-- ------------------------------------------------------
ALTER TABLE `heroku_a51da3167c7e5af`.`product_category`
ADD CONSTRAINT FK_PRODUCT_CATEGORY_PRODUCT
FOREIGN KEY (productID)
REFERENCES `heroku_a51da3167c7e5af`.`product`(id);

ALTER TABLE `heroku_a51da3167c7e5af`.`product_category`
ADD CONSTRAINT FK_PRODUCT_CATEGORY_CATEGORY1
FOREIGN KEY (categoryID)
REFERENCES `heroku_a51da3167c7e5af`.`category`(id);
-- ------------------------------------------------------
-- FK_PRODUCT_INGREDIENT
-- ------------------------------------------------------
ALTER TABLE `heroku_a51da3167c7e5af`.`product_ingredient`
ADD CONSTRAINT FK_PRODUCT_INGREDIENT_PRODUCT
FOREIGN KEY (productID)
REFERENCES `heroku_a51da3167c7e5af`.`product`(id);

ALTER TABLE `heroku_a51da3167c7e5af`.`product_ingredient`
ADD CONSTRAINT FK_PRODUCT_INGREDIENT_INGREDIENT
FOREIGN KEY (ingredientID)
REFERENCES `heroku_a51da3167c7e5af`.`ingredient`(id);
-- ------------------------------------------------------
-- FK_PRODUCT_RATING
-- ------------------------------------------------------
ALTER TABLE `heroku_a51da3167c7e5af`.`product_rating`
ADD CONSTRAINT FK_PRODUCT_RATING_PRODUCT
FOREIGN KEY (productID)
REFERENCES `heroku_a51da3167c7e5af`.`product`(id);
-- ------------------------------------------------------
-- FK_PRODUCT_DISCOUNT
-- ------------------------------------------------------
ALTER TABLE `heroku_a51da3167c7e5af`.`product`
ADD CONSTRAINT FK_PRODUCT_DISCOUNT
FOREIGN KEY (discountID)
REFERENCES `heroku_a51da3167c7e5af`.`discount`(id);
-- ------------------------------------------------------
-- FK_CART
-- ------------------------------------------------------
ALTER TABLE `heroku_a51da3167c7e5af`.`cart`
ADD CONSTRAINT FK_CART_PRODUCT
FOREIGN KEY (productId)
REFERENCES `heroku_a51da3167c7e5af`.`product`(id);

ALTER TABLE `heroku_a51da3167c7e5af`.`cart`
ADD CONSTRAINT FK_CART_USER_INFO
FOREIGN KEY (userId)
REFERENCES `heroku_a51da3167c7e5af`.`user_info`(id);
-- ------------------------------------------------------
-- FK_CART
-- ------------------------------------------------------




