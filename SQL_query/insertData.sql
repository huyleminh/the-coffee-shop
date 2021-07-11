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
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9568692a-22a3-419d-b64f-140bed0642c0','ae823e2f-6c64-40d2-b845-2318c58ec98d');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9568692a-22a3-419d-b64f-140bed0642c0','b13336cf-24f9-4ff5-9d30-879465b1106f');
INSERT INTO `heroku_a51da3167c7e5af`.`product_category` (categoryId,productId) VALUES ('9568692a-22a3-419d-b64f-140bed0642c0','36fc349a-866a-4486-ba9b-88bc6d701cae');
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






