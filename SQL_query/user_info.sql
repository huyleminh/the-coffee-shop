SELECT * FROM heroku_a51da3167c7e5af.user_info;
INSERT INTO `heroku_a51da3167c7e5af`.`user_info` (`ID`, `name`, `Address`, `Phone_number`, `gender`) VALUES ('ABCDEFG1', 'Phan Minh Hiếu', 'Tân Kiên', '0975094096', b'0');
INSERT INTO `heroku_a51da3167c7e5af`.`user_info` (`ID`, `name`, `Address`, `gender`) VALUES ('ABCDEFG2', 'Nguyễn Hứu Hùng', 'Q8', b'0');
INSERT INTO `heroku_a51da3167c7e5af`.`user_info` (`ID`, `name`, `gender`) VALUES ('ABCDEFG3', 'Lê Minh Huy', b'0');
INSERT INTO `heroku_a51da3167c7e5af`.`user_info` (`ID`, `name`, `gender`) VALUES ('ABCDEFG4', 'Bạch Minh Khôi', b'0');
INSERT INTO `heroku_a51da3167c7e5af`.`user_info` (`ID`, `name`, `gender`) VALUES ('ABCDEFG5', 'Lê Hoàng Anh', b'0');


update `user_info`
set `user_info`.`Created_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG1";

update `user_info`
set `user_info`.`Created_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG2";

update `user_info`
set `user_info`.`Created_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG3";

update `user_info`
set `user_info`.`Created_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG4";

update `user_info`
set `user_info`.`Created_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG5";
-- -----------------------------------------------------------------------------------------------
update `user_info`
set `user_info`.`UPDATED_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG1";

update `user_info`
set `user_info`.`UPDATED_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG2";

update `user_info`
set `user_info`.`UPDATED_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG3";

update `user_info`
set `user_info`.`UPDATED_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG4";

update `user_info`
set `user_info`.`UPDATED_AT`= DATE(NOW())
where `user_info`.`ID`="ABCDEFG5";


