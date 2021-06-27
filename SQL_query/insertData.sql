INSERT INTO `heroku_a51da3167c7e5af`.`USER_INFO` (`id`, `fullname`, `address`, `phoneNumber`, `gender`, `updatedAt`, `createdAt`) 
VALUES ('ABCDEF1', 'Phan Minh Hiếu', 'TPHCM', '0123456789', b'0', current_timestamp(), current_timestamp());
INSERT INTO `heroku_a51da3167c7e5af`.`USER_LOGIN` (`id`, `username`, `password`, `role`, `updatedAt`) 
VALUES ('ABCDEF1', 'customer01', '1234567c', '3', current_timestamp());


INSERT INTO `heroku_a51da3167c7e5af`.`USER_INFO` (`id`, `fullname`, `address`, `phoneNumber`, `gender`, `updatedAt`, `createdAt`) 
VALUES ('ABCDEF2', 'Lê Minh Huy', 'Gia Lai', '0987654321', b'0', current_timestamp(), current_timestamp());
INSERT INTO `heroku_a51da3167c7e5af`.`USER_LOGIN` (`id`, `username`, `password`, `role`, `updatedAt`) 
VALUES ('ABCDEF2', 'customer02', '1234567c', '3', current_timestamp());


INSERT INTO `heroku_a51da3167c7e5af`.`USER_INFO` (`id`, `fullname`, `address`, `phoneNumber`, `gender`, `updatedAt`, `createdAt`) 
VALUES ('ABCDEF3', 'Bạch Minh Khôi', 'Khánh Hoà', '0135792468', b'0', current_timestamp(), current_timestamp());
INSERT INTO `heroku_a51da3167c7e5af`.`USER_LOGIN` (`id`, `username`, `password`, `role`, `updatedAt`) 
VALUES ('ABCDEF3', 'employee01', '1234567e', '2', current_timestamp());


INSERT INTO `heroku_a51da3167c7e5af`.`USER_INFO` (`id`, `fullname`, `address`, `phoneNumber`, `gender`, `updatedAt`, `createdAt`) 
VALUES ('ABCDEF4', 'Nguyễn Hứa Hùng', 'TPHCM', '0246813579', b'0', current_timestamp(), current_timestamp());
INSERT INTO `heroku_a51da3167c7e5af`.`USER_LOGIN` (`id`, `username`, `password`, `role`, `updatedAt`) 
VALUES ('ABCDEF4', 'employee02', '1234567e', '2', current_timestamp());


INSERT INTO `heroku_a51da3167c7e5af`.`USER_INFO` (`id`, `fullname`, `address`, `phoneNumber`, `gender`, `updatedAt`, `createdAt`) 
VALUES ('ABCDEF5', 'Lê Hoàng Anh', 'Đồng Tháp', '0123167841', b'0', current_timestamp(), current_timestamp());
INSERT INTO `heroku_a51da3167c7e5af`.`USER_LOGIN` (`id`, `username`, `password`, `role`, `updatedAt`) 
VALUES ('ABCDEF5', 'admin_01', '1234567a', '1', current_timestamp());


SELECT * FROM heroku_a51da3167c7e5af.USER_INFO;
SELECT * FROM heroku_a51da3167c7e5af.USER_LOGIN;
