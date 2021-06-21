SELECT * FROM heroku_a51da3167c7e5af.user_login;
INSERT INTO `heroku_a51da3167c7e5af`.`user_login` (`ID`, `username`, `password`, `role_id`) VALUES ('ABCDEFG1', 'mihi', '123', '1');
INSERT INTO `heroku_a51da3167c7e5af`.`user_login` (`ID`, `username`, `password`, `role_id`) VALUES ('ABCDEFG2', 'hhung', '123', '1');
INSERT INTO `heroku_a51da3167c7e5af`.`user_login` (`ID`, `username`, `password`, `role_id`) VALUES ('ABCDEFG3', 'mihuy', '123', '1');
INSERT INTO `heroku_a51da3167c7e5af`.`user_login` (`ID`, `username`, `password`, `role_id`) VALUES ('ABCDEFG4', 'mikhoi', '123', '1');
INSERT INTO `heroku_a51da3167c7e5af`.`user_login` (`ID`, `username`, `password`, `role_id`) VALUES ('ABCDEFG5', 'hanh', '123', '1');

UPDATE `heroku_a51da3167c7e5af`.`user_login` SET `PASSWORD` = '123456' WHERE (`ID` = 'ABCDEFG1');
UPDATE `heroku_a51da3167c7e5af`.`user_login` SET `PASSWORD` = '123456' WHERE (`ID` = 'ABCDEFG2');
UPDATE `heroku_a51da3167c7e5af`.`user_login` SET `PASSWORD` = '123456' WHERE (`ID` = 'ABCDEFG3');
UPDATE `heroku_a51da3167c7e5af`.`user_login` SET `PASSWORD` = '123456' WHERE (`ID` = 'ABCDEFG4');
UPDATE `heroku_a51da3167c7e5af`.`user_login` SET `PASSWORD` = '123456' WHERE (`ID` = 'ABCDEFG5');

update `user_login`
set `user_login`.`UPDATED_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG1";

update `user_login`
set `user_login`.`UPDATED_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG2";

update `user_login`
set `user_login`.`UPDATED_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG3";

update `user_login`
set `user_login`.`UPDATED_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG4";

update `user_login`
set `user_login`.`UPDATED_AT`= DATE(NOW())
where `user_login`.`ID`="ABCDEFG5";