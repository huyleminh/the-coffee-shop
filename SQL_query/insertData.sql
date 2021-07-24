INSERT INTO `heroku_a51da3167c7e5af`.`user_info` (id, fullname, address, phoneNumber, gender, updatedAt, createdAt)
VALUES
	('2eHuNfS', 'Phan Minh Hiếu', 'TPHCM', '0123456789', b'0', current_timestamp(), current_timestamp()),
	('ALggysE', 'le minh huy', '', '0111111115', b'0', current_timestamp(), current_timestamp()),
	('cchwDul', 'le minh huy', '', '0111111114', b'0', current_timestamp(), current_timestamp()),
	('d5iGKPp', 'Nguyễn Hứa Hùng', 'TPHCM', '0246813579', b'0', current_timestamp(), current_timestamp()),
	('d71N9dN', 'lê hoàng anh', 'Đồng Tháp', '0762672399', b'0', current_timestamp(), current_timestamp()),
	('Er1E2t8', 'Bạch Minh Khôi',' Khánh Hoà', '0135792468', b'0', current_timestamp(), current_timestamp()),
	('FDHVWyT', 'le minh huy', '', '0111111112', b'0', current_timestamp(), current_timestamp()),
	('J6saKBZ', 'le minh huy', '', '0111111116', b'0', current_timestamp(), current_timestamp()),
	('xSF4R5S', 'le minh huy', '', '0111111111', b'0', current_timestamp(), current_timestamp()),
	('yli440d', 'Lê Minh Huy', 'Gia Lai', '0987654321', b'0', current_timestamp(), current_timestamp()),
	('zIFLqCG', 'le minh huy', '', '0111111113', b'0', current_timestamp(), current_timestamp());
 -- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------   
INSERT INTO `heroku_a51da3167c7e5af`.`user_login` (id, username, password, role, updatedAt)
VALUES
    ('2eHuNfS', 'customer01', '1234567c', '3', current_timestamp()),
    ('ALggysE', 'huytest05', '123456789h', '3', current_timestamp()),
    ('cchwDul', 'huytest04', '123456789h', '3', current_timestamp()),
    ('d5iGKPp', 'employee02', '1234567e', '2', current_timestamp()),
    ('d71N9dN', 'admin_01', '1234567a', '1', current_timestamp()),
    ('Er1E2t8', 'employee01', '1234567e', '2', current_timestamp()),
    ('FDHVWyT', 'huytest02', '123456789h', '3', current_timestamp()),
    ('J6saKBZ', 'huytest06', '123456789h', '3', current_timestamp()),
    ('xSF4R5S', 'huytest01', '123456789h', '3', current_timestamp()),
    ('yli440d', 'customer02', '1234567c', '3', current_timestamp()),
    ('zIFLqCG', 'huytest03', '123456789h', '3', current_timestamp());
-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------    
INSERT INTO `heroku_a51da3167c7e5af`.`category` (id,name)
VALUES
 ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','Coffee'),
('783042ac-d75e-400f-819a-2d8e8116666d','Tea'),
('9568692a-22a3-419d-b64f-140bed0642c0','Milk tea'),
('b3a5adc3-7180-43c2-a5f9-22b6f0996598','Fruit juice'),
('9ba61a6d-e64a-44db-aa7b-320930e0c56a','Sparkling water');

-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`discount` (id,percent,active,endDate)
VALUES
('ebadbe70-395e-40d8-98f9-26f764b55997',0.1,1,'2021-08-11 07:55:37'),
('cb736409-5a60-44ac-b0a3-eb8a0e69dbb1',0.1,1,'2021-08-11 07:55:37'),
('8066044a-6be6-4770-85bd-e49341b6ef19',0.2,1,'2021-08-11 07:55:37'),
('eb4cd0eb-4d4a-4a0d-8511-8f06be057ca5',0.3,1,'2021-08-11 07:55:37'),
('180b0521-2daa-445a-86af-2f2acc90dee7',0.25,1,'2021-08-11 07:55:37');

-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`product` (id,name,price,discountId)
VALUES
('f53905d4-8f95-497d-bff7-2a9bdfbcdda2','Instant coffee',45000,'8066044a-6be6-4770-85bd-e49341b6ef19'),
('6d5a95d8-a1d4-4e88-b05b-baf224a4e9d2','Phin coffee',35000,'ebadbe70-395e-40d8-98f9-26f764b55997'),
('206444c7-5ee6-4ecb-a42e-6e04a42bcb49','Cappuccino',40000,'eb4cd0eb-4d4a-4a0d-8511-8f06be057ca5'),
('6dcadbfc-5300-484c-b58a-228974efb09e','Olong tea',40000,'180b0521-2daa-445a-86af-2f2acc90dee7'),
('600da386-9ea1-4a2e-91fe-e2db43b2eadf','Sprite',40000,'cb736409-5a60-44ac-b0a3-eb8a0e69dbb1');

-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`product` (id,name,price)
VALUES
('16ee6743-5f35-4c35-8226-25a9e7ea5474','Black coffee',30000),
('99db7b76-000a-4eb3-93b5-2c93e34881d7','White coffee',35000),
('99710d93-8de7-4ea7-8a17-b3454a5cd726','Decaf coffee',40000),
('d07b4343-3984-4c3f-a05a-e1770860a361','Egg coffee',50000),
('1b5d044e-42c3-4500-9171-4917fcfccf04','Weasel coffee',65000),
('78999982-ff34-4742-b2fa-cbfd6cc8f33d','Espresso ',45000),
('d1861ee7-a4a9-494a-b488-ffa7e1a7402c','Americano',40000),
('fd63f4ee-0b4f-4bec-aba6-1e03c3ff4d59','Latte',40000),
('dde6ad94-439b-4c3c-b552-138f572797e3','Macchiato',40000),
('1977d368-61b7-4713-8e4a-cae95ce37a37','Mocha',40000),
('29cf6d7b-bb65-45b7-bbed-0142d2b8d355','Green tea',30000),
('02c15516-0a5d-4f2e-b3fe-43b707a84024','Black tea',35000),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','Earl Grey tea',45000),
('77080847-46e7-44d1-900e-ffcb754a83af','Herbal tea ',50000),
('37c18857-bd2d-419f-a1e4-f9b82d6a2e34','Fruit tea',35000),
('8366c3f7-6ba1-49d2-8380-c4c267caa4ea','Iced tea',65000),
('ae823e2f-6c64-40d2-b845-2318c58ec98d','Pineapple juice',45000),
('b13336cf-24f9-4ff5-9d30-879465b1106f','Orange juice',40000),
('36fc349a-866a-4486-ba9b-88bc6d701cae','Tomato juice',40000),
('c39f2884-0fc8-4239-9972-77caf29e51cf','Coca cola',40000),
('5de298df-5a13-4dbd-ad7e-94a8d892aa09','Pepsi',40000),
('8447b877-4a40-4ed8-a6fd-15a632a8ae20','Monster',40000),
('57ac9ac4-e079-4620-bfff-87f177842a66','Red bull',30000),
('292bc851-c639-4927-b971-bf6c5e10c79f','Fanta orange',35000),
('9c1f5fe2-f40c-457f-bae6-be9977e6f00c','Number 1',35000);


-- -----------insert data into many to many table
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','16ee6743-5f35-4c35-8226-25a9e7ea5474');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','99db7b76-000a-4eb3-93b5-2c93e34881d7');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','f53905d4-8f95-497d-bff7-2a9bdfbcdda2');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','99710d93-8de7-4ea7-8a17-b3454a5cd726');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','d07b4343-3984-4c3f-a05a-e1770860a361');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','6d5a95d8-a1d4-4e88-b05b-baf224a4e9d2');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','1b5d044e-42c3-4500-9171-4917fcfccf04');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','78999982-ff34-4742-b2fa-cbfd6cc8f33d');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','d1861ee7-a4a9-494a-b488-ffa7e1a7402c');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','206444c7-5ee6-4ecb-a42e-6e04a42bcb49');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','fd63f4ee-0b4f-4bec-aba6-1e03c3ff4d59');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','dde6ad94-439b-4c3c-b552-138f572797e3');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('ecdf2adf-efc2-4805-a2e0-b000911dcd73','1977d368-61b7-4713-8e4a-cae95ce37a37');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('783042ac-d75e-400f-819a-2d8e8116666d','29cf6d7b-bb65-45b7-bbed-0142d2b8d355');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('783042ac-d75e-400f-819a-2d8e8116666d','02c15516-0a5d-4f2e-b3fe-43b707a84024');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('783042ac-d75e-400f-819a-2d8e8116666d','1d009b21-e1d0-4686-9e85-ac6a63e6f9a7');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('783042ac-d75e-400f-819a-2d8e8116666d','6dcadbfc-5300-484c-b58a-228974efb09e');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('783042ac-d75e-400f-819a-2d8e8116666d','77080847-46e7-44d1-900e-ffcb754a83af');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('783042ac-d75e-400f-819a-2d8e8116666d','37c18857-bd2d-419f-a1e4-f9b82d6a2e34');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('783042ac-d75e-400f-819a-2d8e8116666d','8366c3f7-6ba1-49d2-8380-c4c267caa4ea');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('b3a5adc3-7180-43c2-a5f9-22b6f0996598','ae823e2f-6c64-40d2-b845-2318c58ec98d');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('b3a5adc3-7180-43c2-a5f9-22b6f0996598','b13336cf-24f9-4ff5-9d30-879465b1106f');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('b3a5adc3-7180-43c2-a5f9-22b6f0996598','36fc349a-866a-4486-ba9b-88bc6d701cae');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9ba61a6d-e64a-44db-aa7b-320930e0c56a','c39f2884-0fc8-4239-9972-77caf29e51cf');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9ba61a6d-e64a-44db-aa7b-320930e0c56a','600da386-9ea1-4a2e-91fe-e2db43b2eadf');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9ba61a6d-e64a-44db-aa7b-320930e0c56a','5de298df-5a13-4dbd-ad7e-94a8d892aa09');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9ba61a6d-e64a-44db-aa7b-320930e0c56a','8447b877-4a40-4ed8-a6fd-15a632a8ae20');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9ba61a6d-e64a-44db-aa7b-320930e0c56a','57ac9ac4-e079-4620-bfff-87f177842a66');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9ba61a6d-e64a-44db-aa7b-320930e0c56a','292bc851-c639-4927-b971-bf6c5e10c79f');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9ba61a6d-e64a-44db-aa7b-320930e0c56a','9c1f5fe2-f40c-457f-bae6-be9977e6f00c');
-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`product_rating` (productId,totalStar,totalRating)
VALUES
('16ee6743-5f35-4c35-8226-25a9e7ea5474',42,10),
('f53905d4-8f95-497d-bff7-2a9bdfbcdda2',36,12),
('d07b4343-3984-4c3f-a05a-e1770860a361',88,22),
('78999982-ff34-4742-b2fa-cbfd6cc8f33d',9,2),
('d1861ee7-a4a9-494a-b488-ffa7e1a7402c',18,4),
('1977d368-61b7-4713-8e4a-cae95ce37a37',58.5,13),
('02c15516-0a5d-4f2e-b3fe-43b707a84024',22.5,5),
('6dcadbfc-5300-484c-b58a-228974efb09e',31.5,7),
('77080847-46e7-44d1-900e-ffcb754a83af',22.5,9),
('8366c3f7-6ba1-49d2-8380-c4c267caa4ea',55,11),
('36fc349a-866a-4486-ba9b-88bc6d701cae',27,6),
('600da386-9ea1-4a2e-91fe-e2db43b2eadf',13.5,3),
('57ac9ac4-e079-4620-bfff-87f177842a66',31.5,9),
('9c1f5fe2-f40c-457f-bae6-be9977e6f00c',7,2);
-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`ingredient` (id,name,quantity,unitOfMeasurement)
VALUES
('139312e6-ee30-401b-a6ff-dbf331d9dd46','Coffee beans',24,'Kg'),
('9f0ffecd-1819-4358-a0a8-91196ac24d2c','Milk',7,'Litre'),
('da4561e1-4e6b-4a06-b888-941885b70061','Milk foam',3,'Litre'),
('cc004780-8a76-4ef4-9252-9953dc0d7aac','Condensed milk',4,'Can'),
('09ba7dc4-1ab8-4d23-ad33-df1f9e84c205','Cream',5,'Litre'),
('a0a6bf84-5b14-443f-a0d0-1b2c0495bba6','Coffee powder',4,'Kg'),
('60a16cff-c98c-4c5c-84a0-c8719df974d5','Sugar',12,'Kg'),
('c53a2375-1080-4d18-b4bf-d352eb2da48a','Espresso',3,'Litre'),
('fee21bb1-51a4-4184-8f93-35ee8cfaadc9','Green tea leaves',1520,'Gram'),
('c33e8ae8-6578-4162-9a81-08898e36eb02','Honey',2410,'ML'),
('c1dc0bc3-19db-4b7e-a482-5f0ca64b284f','Green tea bag',78,'pcs'),
('b318c8f8-1a86-42c7-bcb8-06f1e0b13478','Tea bag',98,'pcs'),
('01af1812-37d5-47b8-baab-ccac0d329e3b','Earl Grey tea bag',65,'pcs'),
('4f45afd2-09c0-4a9a-a4bb-2e33c5055514','Herbal kit',23,'pcs'),
('97000e56-73e7-4664-9c5c-dab7e956a25a','Fanta orange',56,'Bottle'),
('a51c590a-15fd-406e-aa2f-b152495bb898','Tomato juice',76,'Bottle'),
('773ad1f3-9e0e-4eb3-8052-f2051b1b12ef','Pepsi',42,'Bottle'),
('308eb209-8d63-44cc-998f-4752ea665431','Sprite',23,'Bottle'),
('6fd33d6b-2ef6-4bf0-b1db-bca39122f193','Monster',47,'Bottle'),
('0f72d155-83e8-48b9-b0cc-aa79615ef22a','Number 1',34,'Bottle'),
('11168e72-22ee-407f-8ddb-1ccfea220c37','Cocacola',46,'Bottle'),
('6adf5aa0-7d20-4ca5-bf62-1e1ca8e573cd','Red bull',24,'Bottle'),
('66fb5256-6c43-4e23-841b-4d0e39dba068','Pineapple juice',12,'Litre'),
('b1d5b7f9-124f-4836-8557-dd66d23ca500','Orange juice',35,'Litre'),
('0e370004-91b7-449a-9f8e-9fa7a498d153','Tomato juice',27,'Litre'),
('9971e02b-9107-4607-a8bd-6ffb552d457b','Decaffeinated instant coffee',7,'Kg'),
('3f7fb9c2-227a-4d01-86bb-8d74739b4677','Egg',46,'pcs'),
('9bfe5c5a-0119-4656-aa12-eeef8b5dc845','Weasel coffee powder',3,'Kg');
-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`product_ingredient` (productId,ingredientId)
VALUES
('16ee6743-5f35-4c35-8226-25a9e7ea5474','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('16ee6743-5f35-4c35-8226-25a9e7ea5474','a0a6bf84-5b14-443f-a0d0-1b2c0495bba6'),
('16ee6743-5f35-4c35-8226-25a9e7ea5474','139312e6-ee30-401b-a6ff-dbf331d9dd46'),
('99db7b76-000a-4eb3-93b5-2c93e34881d7','cc004780-8a76-4ef4-9252-9953dc0d7aac'),
('99db7b76-000a-4eb3-93b5-2c93e34881d7','09ba7dc4-1ab8-4d23-ad33-df1f9e84c205'),
('99db7b76-000a-4eb3-93b5-2c93e34881d7','a0a6bf84-5b14-443f-a0d0-1b2c0495bba6'),
('f53905d4-8f95-497d-bff7-2a9bdfbcdda2','a0a6bf84-5b14-443f-a0d0-1b2c0495bba6'),
('f53905d4-8f95-497d-bff7-2a9bdfbcdda2','cc004780-8a76-4ef4-9252-9953dc0d7aac'),
('f53905d4-8f95-497d-bff7-2a9bdfbcdda2','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('99710d93-8de7-4ea7-8a17-b3454a5cd726','9971e02b-9107-4607-a8bd-6ffb552d457b'),
('99710d93-8de7-4ea7-8a17-b3454a5cd726','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('99710d93-8de7-4ea7-8a17-b3454a5cd726','09ba7dc4-1ab8-4d23-ad33-df1f9e84c205'),
('d07b4343-3984-4c3f-a05a-e1770860a361','3f7fb9c2-227a-4d01-86bb-8d74739b4677'),
('d07b4343-3984-4c3f-a05a-e1770860a361','c53a2375-1080-4d18-b4bf-d352eb2da48a'),
('d07b4343-3984-4c3f-a05a-e1770860a361','cc004780-8a76-4ef4-9252-9953dc0d7aac'),
('6d5a95d8-a1d4-4e88-b05b-baf224a4e9d2','a0a6bf84-5b14-443f-a0d0-1b2c0495bba6'),
('6d5a95d8-a1d4-4e88-b05b-baf224a4e9d2','cc004780-8a76-4ef4-9252-9953dc0d7aac'),
('1b5d044e-42c3-4500-9171-4917fcfccf04','9bfe5c5a-0119-4656-aa12-eeef8b5dc845'),
('1b5d044e-42c3-4500-9171-4917fcfccf04','cc004780-8a76-4ef4-9252-9953dc0d7aac'),
('78999982-ff34-4742-b2fa-cbfd6cc8f33d','c53a2375-1080-4d18-b4bf-d352eb2da48a'),
('d1861ee7-a4a9-494a-b488-ffa7e1a7402c','139312e6-ee30-401b-a6ff-dbf331d9dd46'),
('d1861ee7-a4a9-494a-b488-ffa7e1a7402c','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('206444c7-5ee6-4ecb-a42e-6e04a42bcb49','c53a2375-1080-4d18-b4bf-d352eb2da48a'),
('206444c7-5ee6-4ecb-a42e-6e04a42bcb49','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('206444c7-5ee6-4ecb-a42e-6e04a42bcb49','9f0ffecd-1819-4358-a0a8-91196ac24d2c'),
('fd63f4ee-0b4f-4bec-aba6-1e03c3ff4d59','9f0ffecd-1819-4358-a0a8-91196ac24d2c'),
('fd63f4ee-0b4f-4bec-aba6-1e03c3ff4d59','a0a6bf84-5b14-443f-a0d0-1b2c0495bba6'),
('dde6ad94-439b-4c3c-b552-138f572797e3','9f0ffecd-1819-4358-a0a8-91196ac24d2c'),
('dde6ad94-439b-4c3c-b552-138f572797e3','a0a6bf84-5b14-443f-a0d0-1b2c0495bba6'),
('dde6ad94-439b-4c3c-b552-138f572797e3','da4561e1-4e6b-4a06-b888-941885b70061'),
('1977d368-61b7-4713-8e4a-cae95ce37a37','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('1977d368-61b7-4713-8e4a-cae95ce37a37','a0a6bf84-5b14-443f-a0d0-1b2c0495bba6'),
('29cf6d7b-bb65-45b7-bbed-0142d2b8d355','c1dc0bc3-19db-4b7e-a482-5f0ca64b284f'),
('29cf6d7b-bb65-45b7-bbed-0142d2b8d355','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('02c15516-0a5d-4f2e-b3fe-43b707a84024','fee21bb1-51a4-4184-8f93-35ee8cfaadc9'),
('02c15516-0a5d-4f2e-b3fe-43b707a84024','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','01af1812-37d5-47b8-baab-ccac0d329e3b'),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('6dcadbfc-5300-484c-b58a-228974efb09e','fee21bb1-51a4-4184-8f93-35ee8cfaadc9'),
('6dcadbfc-5300-484c-b58a-228974efb09e','9f0ffecd-1819-4358-a0a8-91196ac24d2c'),
('6dcadbfc-5300-484c-b58a-228974efb09e','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('77080847-46e7-44d1-900e-ffcb754a83af','4f45afd2-09c0-4a9a-a4bb-2e33c5055514'),
('77080847-46e7-44d1-900e-ffcb754a83af','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('37c18857-bd2d-419f-a1e4-f9b82d6a2e34','4f45afd2-09c0-4a9a-a4bb-2e33c5055514'),
('37c18857-bd2d-419f-a1e4-f9b82d6a2e34','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('8366c3f7-6ba1-49d2-8380-c4c267caa4ea','b318c8f8-1a86-42c7-bcb8-06f1e0b13478'),
('8366c3f7-6ba1-49d2-8380-c4c267caa4ea','60a16cff-c98c-4c5c-84a0-c8719df974d5'),
('ae823e2f-6c64-40d2-b845-2318c58ec98d','66fb5256-6c43-4e23-841b-4d0e39dba068'),
('b13336cf-24f9-4ff5-9d30-879465b1106f','b1d5b7f9-124f-4836-8557-dd66d23ca500'),
('36fc349a-866a-4486-ba9b-88bc6d701cae','0e370004-91b7-449a-9f8e-9fa7a498d153'),
('c39f2884-0fc8-4239-9972-77caf29e51cf','11168e72-22ee-407f-8ddb-1ccfea220c37'),
('600da386-9ea1-4a2e-91fe-e2db43b2eadf','308eb209-8d63-44cc-998f-4752ea665431'),
('5de298df-5a13-4dbd-ad7e-94a8d892aa09','773ad1f3-9e0e-4eb3-8052-f2051b1b12ef'),
('8447b877-4a40-4ed8-a6fd-15a632a8ae20','6fd33d6b-2ef6-4bf0-b1db-bca39122f193'),
('57ac9ac4-e079-4620-bfff-87f177842a66','6adf5aa0-7d20-4ca5-bf62-1e1ca8e573cd'),
('292bc851-c639-4927-b971-bf6c5e10c79f','97000e56-73e7-4664-9c5c-dab7e956a25a'),
('9c1f5fe2-f40c-457f-bae6-be9977e6f00c','0f72d155-83e8-48b9-b0cc-aa79615ef22a');
-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`wishlist` (productId,userId)
VALUES
('02c15516-0a5d-4f2e-b3fe-43b707a84024','2eHuNfS'),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','2eHuNfS'),
('fd63f4ee-0b4f-4bec-aba6-1e03c3ff4d59','2eHuNfS'),
('78999982-ff34-4742-b2fa-cbfd6cc8f33d','2eHuNfS'),
('8366c3f7-6ba1-49d2-8380-c4c267caa4ea','2eHuNfS'),
('36fc349a-866a-4486-ba9b-88bc6d701cae','2eHuNfS'),
('d1861ee7-a4a9-494a-b488-ffa7e1a7402c','2eHuNfS'),
('6d5a95d8-a1d4-4e88-b05b-baf224a4e9d2','2eHuNfS'),
('99710d93-8de7-4ea7-8a17-b3454a5cd726','2eHuNfS'),
('29cf6d7b-bb65-45b7-bbed-0142d2b8d355','J6saKBZ'),
('c39f2884-0fc8-4239-9972-77caf29e51cf','J6saKBZ'),
('b13336cf-24f9-4ff5-9d30-879465b1106f','J6saKBZ'),
('5de298df-5a13-4dbd-ad7e-94a8d892aa09','J6saKBZ'),
('57ac9ac4-e079-4620-bfff-87f177842a66','J6saKBZ'),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','ALggysE'),
('02c15516-0a5d-4f2e-b3fe-43b707a84024','ALggysE'),
('99710d93-8de7-4ea7-8a17-b3454a5cd726','ALggysE'),
('29cf6d7b-bb65-45b7-bbed-0142d2b8d355','ALggysE'),
('c39f2884-0fc8-4239-9972-77caf29e51cf','yli440d'),
('b13336cf-24f9-4ff5-9d30-879465b1106f','yli440d'),
('5de298df-5a13-4dbd-ad7e-94a8d892aa09','yli440d'),
('57ac9ac4-e079-4620-bfff-87f177842a66','yli440d'),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','yli440d');
-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`order` (id,userId,Status,isPaid)
VALUES
('86e48208-9bfa-49b8-aa0b-001a3e455971','2eHuNfS',0,1),
('ef1593c9-d17a-4bc1-bf8f-bf1c2c46c11e','2eHuNfS',2,1),
('8cd544f2-11bf-4248-a5c8-9d3aec7ac64c','2eHuNfS',3,1),
('09463f13-c02b-4dc0-90ae-31cf4d0ebb8a','2eHuNfS',1,0),
('e7d8cefc-85a9-4103-8602-bb1f7465b8e6','2eHuNfS',2,1),
('cf29cf0c-5107-4a41-a395-c66c44ff74b3','2eHuNfS',3,0),
('2b755131-c9eb-447e-85d8-a162f979eb75','2eHuNfS',1,1),
('50af560e-125c-4518-bba2-4035886b2387','2eHuNfS',0,1),
('3600383b-e6ea-4afe-a411-45fa5fee2d60','2eHuNfS',3,0),
('1d415eb6-3476-4abc-85d6-f71afb6c9c93','J6saKBZ',2,0),
('c5257217-4cf4-4f2d-9b23-affb2f83d306','J6saKBZ',1,1),
('a0564d3f-b788-4699-9c24-e59e9ac244c7','J6saKBZ',0,0),
('1f201713-1c0f-4bc6-86a8-6b2631bfbddc','J6saKBZ',1,1),
('f18a7d96-8d16-43ba-8d9b-b7a4057de7d1','J6saKBZ',2,0),
('703b2238-c8b7-4983-830e-0add1073c9ea','ALggysE',3,1),
('bd9cdda3-8ec5-4d3b-898a-8453ac98b3c3','ALggysE',1,0),
('3747d57b-516d-4b96-acf6-27d11af8369d','ALggysE',2,1),
('365c88d2-579f-4f9d-af1a-ebf614c45c4a','ALggysE',0,0),
('39fe82a0-26fe-4a97-9cc4-2fd932ffb7fb','ALggysE',1,1),
('f6b10272-0d91-480a-a2c8-7a2aa80d00fc','yli440d',3,0),
('0b825e16-5a00-424a-9791-51f7f6d1efbd','yli440d',1,0),
('9c3faeed-1dc6-4c0a-bb2c-f0dbd8fdfc12','yli440d',2,1),
('f0d8668f-f4c3-423e-85ea-9c5e86387b58','yli440d',0,0),
('2af246f2-ec2d-40a4-b748-51caaee8e7dd','yli440d',1,1),
('c407bf69-8c60-4adc-912b-6b8201b6e712','2eHuNfS',2,0),
('4370a1db-dd2e-40a1-8f4d-d626850db324','2eHuNfS',3,0),
('90b30c82-1895-4f5a-8bb0-b71a64ffd362','2eHuNfS',1,0),
('519396e6-0fb1-4dd7-ad7b-5da3d46af69f','2eHuNfS',2,1),
('6c4b3868-a1c2-47a9-a4ba-9cdb3d136c49','2eHuNfS',0,1);
-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
INSERT INTO `heroku_a51da3167c7e5af`.`product_order` (productId,orderId,quantity)
VALUES
('16ee6743-5f35-4c35-8226-25a9e7ea5474','86e48208-9bfa-49b8-aa0b-001a3e455971',3),
('f53905d4-8f95-497d-bff7-2a9bdfbcdda2','86e48208-9bfa-49b8-aa0b-001a3e455971',4),
('78999982-ff34-4742-b2fa-cbfd6cc8f33d','ef1593c9-d17a-4bc1-bf8f-bf1c2c46c11e',2),
('d07b4343-3984-4c3f-a05a-e1770860a361','8cd544f2-11bf-4248-a5c8-9d3aec7ac64c',1),
('d1861ee7-a4a9-494a-b488-ffa7e1a7402c','09463f13-c02b-4dc0-90ae-31cf4d0ebb8a',3),
('fd63f4ee-0b4f-4bec-aba6-1e03c3ff4d59','e7d8cefc-85a9-4103-8602-bb1f7465b8e6',2),
('02c15516-0a5d-4f2e-b3fe-43b707a84024','cf29cf0c-5107-4a41-a395-c66c44ff74b3',1),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','2b755131-c9eb-447e-85d8-a162f979eb75',2),
('fd63f4ee-0b4f-4bec-aba6-1e03c3ff4d59','50af560e-125c-4518-bba2-4035886b2387',3),
('78999982-ff34-4742-b2fa-cbfd6cc8f33d','3600383b-e6ea-4afe-a411-45fa5fee2d60',4),
('8366c3f7-6ba1-49d2-8380-c4c267caa4ea','1d415eb6-3476-4abc-85d6-f71afb6c9c93',1),
('36fc349a-866a-4486-ba9b-88bc6d701cae','c5257217-4cf4-4f2d-9b23-affb2f83d306',2),
('d1861ee7-a4a9-494a-b488-ffa7e1a7402c','a0564d3f-b788-4699-9c24-e59e9ac244c7',3),
('6d5a95d8-a1d4-4e88-b05b-baf224a4e9d2','1f201713-1c0f-4bc6-86a8-6b2631bfbddc',4),
('99710d93-8de7-4ea7-8a17-b3454a5cd726','f18a7d96-8d16-43ba-8d9b-b7a4057de7d1',2),
('29cf6d7b-bb65-45b7-bbed-0142d2b8d355','703b2238-c8b7-4983-830e-0add1073c9ea',2),
('c39f2884-0fc8-4239-9972-77caf29e51cf','bd9cdda3-8ec5-4d3b-898a-8453ac98b3c3',3),
('b13336cf-24f9-4ff5-9d30-879465b1106f','3747d57b-516d-4b96-acf6-27d11af8369d',1),
('5de298df-5a13-4dbd-ad7e-94a8d892aa09','365c88d2-579f-4f9d-af1a-ebf614c45c4a',4),
('57ac9ac4-e079-4620-bfff-87f177842a66','39fe82a0-26fe-4a97-9cc4-2fd932ffb7fb',2),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','f6b10272-0d91-480a-a2c8-7a2aa80d00fc',3),
('02c15516-0a5d-4f2e-b3fe-43b707a84024','0b825e16-5a00-424a-9791-51f7f6d1efbd',1),
('1d009b21-e1d0-4686-9e85-ac6a63e6f9a7','9c3faeed-1dc6-4c0a-bb2c-f0dbd8fdfc12',4),
('fd63f4ee-0b4f-4bec-aba6-1e03c3ff4d59','f0d8668f-f4c3-423e-85ea-9c5e86387b58',2),
('78999982-ff34-4742-b2fa-cbfd6cc8f33d','2af246f2-ec2d-40a4-b748-51caaee8e7dd',6),
('8366c3f7-6ba1-49d2-8380-c4c267caa4ea','c407bf69-8c60-4adc-912b-6b8201b6e712',5),
('36fc349a-866a-4486-ba9b-88bc6d701cae','4370a1db-dd2e-40a1-8f4d-d626850db324',2),
('d1861ee7-a4a9-494a-b488-ffa7e1a7402c','90b30c82-1895-4f5a-8bb0-b71a64ffd362',3),
('6d5a95d8-a1d4-4e88-b05b-baf224a4e9d2','519396e6-0fb1-4dd7-ad7b-5da3d46af69f',6),
('6d5a95d8-a1d4-4e88-b05b-baf224a4e9d2','6c4b3868-a1c2-47a9-a4ba-9cdb3d136c49',5);

-- ----------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phạm Lệ Băng',O.phoneNumber='0167430611'WHERE O.id='09463f13-c02b-4dc0-90ae-31cf4d0ebb8a';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Lê Minh Huy',O.phoneNumber='0163198855'WHERE O.id='2b755131-c9eb-447e-85d8-a162f979eb75';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Trần Hữu Ðạt',O.phoneNumber='0167799936'WHERE O.id='3600383b-e6ea-4afe-a411-45fa5fee2d60';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Trần Trọng Nghĩa',O.phoneNumber='0167226245'WHERE O.id='4370a1db-dd2e-40a1-8f4d-d626850db324';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Ngô Thái Hồng',O.phoneNumber='0163185983'WHERE O.id='50af560e-125c-4518-bba2-4035886b2387';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Nguyễn Tuấn Tài',O.phoneNumber='0163671665'WHERE O.id='519396e6-0fb1-4dd7-ad7b-5da3d46af69f';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Minh Hiếu',O.phoneNumber='0168763026'WHERE O.id='6c4b3868-a1c2-47a9-a4ba-9cdb3d136c49';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phạm Thu Liên',O.phoneNumber='0165229063'WHERE O.id='86e48208-9bfa-49b8-aa0b-001a3e455971';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Minh Hiếu',O.phoneNumber='0168067639'WHERE O.id='8cd544f2-11bf-4248-a5c8-9d3aec7ac64c';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Nguyễn Văn Thành',O.phoneNumber='0166246845'WHERE O.id='90b30c82-1895-4f5a-8bb0-b71a64ffd362';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Bảo Khánh',O.phoneNumber='0163653797'WHERE O.id='c407bf69-8c60-4adc-912b-6b8201b6e712';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Minh Hiếu',O.phoneNumber='0165573656'WHERE O.id='cf29cf0c-5107-4a41-a395-c66c44ff74b3';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Ngô Quế Phương',O.phoneNumber='0166170078'WHERE O.id='e7d8cefc-85a9-4103-8602-bb1f7465b8e6';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Trần Thụy Du',O.phoneNumber='0167919115'WHERE O.id='ef1593c9-d17a-4bc1-bf8f-bf1c2c46c11e';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Trần Khánh Minh',O.phoneNumber='0168158322'WHERE O.id='365c88d2-579f-4f9d-af1a-ebf614c45c4a';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Trần Văn Minh',O.phoneNumber='0167332864'WHERE O.id='3747d57b-516d-4b96-acf6-27d11af8369d';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Anh Khải',O.phoneNumber='0166339456'WHERE O.id='39fe82a0-26fe-4a97-9cc4-2fd932ffb7fb';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Ngô Cát Tiên',O.phoneNumber='0164425978'WHERE O.id='703b2238-c8b7-4983-830e-0add1073c9ea';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Lê Hoàng Anh',O.phoneNumber='0167283512'WHERE O.id='bd9cdda3-8ec5-4d3b-898a-8453ac98b3c3';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Lê Minh Huy',O.phoneNumber='0165286947'WHERE O.id='1d415eb6-3476-4abc-85d6-f71afb6c9c93';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Minh Hiếu',O.phoneNumber='0163298404'WHERE O.id='1f201713-1c0f-4bc6-86a8-6b2631bfbddc';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Trần Xuân Hòa',O.phoneNumber='0163046038'WHERE O.id='a0564d3f-b788-4699-9c24-e59e9ac244c7';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Nguyễn Hồng Đăng Phúc',O.phoneNumber='0162565693'WHERE O.id='c5257217-4cf4-4f2d-9b23-affb2f83d306';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Minh Hiếu',O.phoneNumber='0166716972'WHERE O.id='f18a7d96-8d16-43ba-8d9b-b7a4057de7d1';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phạm Thanh Tâm',O.phoneNumber='0165231273'WHERE O.id='15df17fc-18f3-48da-ad99-e5d8e16ac192';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Nguyễn Nguyên Ðan',O.phoneNumber='0168498900'WHERE O.id='4386f4aa-f47d-41d0-b3df-28b8a88324e6';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Minh Hiếu',O.phoneNumber='0162611578'WHERE O.id='c9f48bc4-9245-4d38-a62c-9f15f8f1db72';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Hoàng Nam',O.phoneNumber='0166461474'WHERE O.id='d3e00b5f-d023-446f-aff0-500b6d534d4e';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phạm Thanh Bình',O.phoneNumber='0164277226'WHERE O.id='f6ed4051-caf4-4ab0-b574-2a3bd731faea';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Ngô Thủy Hằng',O.phoneNumber='0167660895'WHERE O.id='0b825e16-5a00-424a-9791-51f7f6d1efbd';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Trần Quốc Hưng',O.phoneNumber='0164309638'WHERE O.id='2af246f2-ec2d-40a4-b748-51caaee8e7dd';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Minh Hiếu',O.phoneNumber='0167161947'WHERE O.id='9c3faeed-1dc6-4c0a-bb2c-f0dbd8fdfc12';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phan Ngọc Thạch',O.phoneNumber='0162069760'WHERE O.id='f0d8668f-f4c3-423e-85ea-9c5e86387b58';
UPDATE heroku_a51da3167c7e5af.order O set O.fullname='Phạm Thu Hà',O.phoneNumber='0167980872'WHERE O.id='f6b10272-0d91-480a-a2c8-7a2aa80d00fc';



