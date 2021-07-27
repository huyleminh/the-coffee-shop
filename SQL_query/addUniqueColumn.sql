ALTER TABLE `heroku_a51da3167c7e5af`.`order`
ADD COLUMN `aliasId` CHAR(16) NOT NULL AFTER `id`,
ADD COLUMN `deliveryFee` INT NOT NULL DEFAULT 0 AFTER `payMethod`;


UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949354-4153'
WHERE id = '09463f13-c02b-4dc0-90ae-31cf4d0ebb8a';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949308-9486'
WHERE id = '0b825e16-5a00-424a-9791-51f7f6d1efbd';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949309-1937'
WHERE id = '15df17fc-18f3-48da-ad99-e5d8e16ac192';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949304-9470'
WHERE id = '1d415eb6-3476-4abc-85d6-f71afb6c9c93';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949300-5784'
WHERE id = '1f201713-1c0f-4bc6-86a8-6b2631bfbddc';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949326-1046'
WHERE id = '2af246f2-ec2d-40a4-b748-51caaee8e7dd';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949327-8026'
WHERE id = '2b755131-c9eb-447e-85d8-a162f979eb75';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949323-1520'
WHERE id = '3600383b-e6ea-4afe-a411-45fa5fee2d60';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949325-5621'
WHERE id = '365c88d2-579f-4f9d-af1a-ebf614c45c4a';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-949588-2635'
WHERE id = '3747d57b-516d-4b96-acf6-27d11af8369d';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947726-7331'
WHERE id = '39fe82a0-26fe-4a97-9cc4-2fd932ffb7fb';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947729-7833'
WHERE id = '4370a1db-dd2e-40a1-8f4d-d626850db324';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947727-6769'
WHERE id = '4386f4aa-f47d-41d0-b3df-28b8a88324e6';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947724-8284'
WHERE id = '50af560e-125c-4518-bba2-4035886b2387';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947724-2107'
WHERE id = '519396e6-0fb1-4dd7-ad7b-5da3d46af69f';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947725-1716'
WHERE id = '6c4b3868-a1c2-47a9-a4ba-9cdb3d136c49';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947720-1971'
WHERE id = '703b2238-c8b7-4983-830e-0add1073c9ea';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947722-1510'
WHERE id = '86e48208-9bfa-49b8-aa0b-001a3e455971';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947488-6331'
WHERE id = '8cd544f2-11bf-4248-a5c8-9d3aec7ac64c';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947481-9745'
WHERE id = '90b30c82-1895-4f5a-8bb0-b71a64ffd362';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947452-8010'
WHERE id = '9c3faeed-1dc6-4c0a-bb2c-f0dbd8fdfc12';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947408-4263'
WHERE id = 'a0564d3f-b788-4699-9c24-e59e9ac244c7';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947401-5569'
WHERE id = 'bd9cdda3-8ec5-4d3b-898a-8453ac98b3c3';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947406-2764'
WHERE id = 'c407bf69-8c60-4adc-912b-6b8201b6e712';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947407-1940'
WHERE id = 'c5257217-4cf4-4f2d-9b23-affb2f83d306';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947404-1790'
WHERE id = 'c9f48bc4-9245-4d38-a62c-9f15f8f1db72';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947403-1609'
WHERE id = 'cf29cf0c-5107-4a41-a395-c66c44ff74b3';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947405-6007'
WHERE id = 'd3e00b5f-d023-446f-aff0-500b6d534d4e';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947400-9636'
WHERE id = 'e7d8cefc-85a9-4103-8602-bb1f7465b8e6';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947402-2105'
WHERE id = 'ef1593c9-d17a-4bc1-bf8f-bf1c2c46c11e';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947421-8045'
WHERE id = 'f0d8668f-f4c3-423e-85ea-9c5e86387b58';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947426-9467'
WHERE id = 'f18a7d96-8d16-43ba-8d9b-b7a4057de7d1';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947429-4714'
WHERE id = 'f6b10272-0d91-480a-a2c8-7a2aa80d00fc';
UPDATE heroku_a51da3167c7e5af.order
SET aliasId = '1365-947424-9325'
WHERE id = 'f6ed4051-caf4-4ab0-b574-2a3bd731faea';


ALTER TABLE heroku_a51da3167c7e5af.order
ADD CONSTRAINT UNIQUE(aliasId);
