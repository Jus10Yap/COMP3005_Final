

--INSERT INTO POSTAL_CODE VALUES (postal code, city, province);
-- province accepts only 2 chars
INSERT INTO POSTAL_CODE VALUES ('K2T1J1','Kanata', 'ON');
INSERT INTO POSTAL_CODE VALUES ('K2A2S3','Kanata', 'ON');
INSERT INTO POSTAL_CODE VALUES ('K2J2M6','Barrhaven', 'ON');
INSERT INTO POSTAL_CODE VALUES ('K2J0B5','Barrhaven', 'ON');
INSERT INTO POSTAL_CODE VALUES ('K2B8C1','Bayshore', 'ON');
INSERT INTO POSTAL_CODE VALUES ('K2H5Z1','Bells Corners', 'ON');
INSERT INTO POSTAL_CODE VALUES ('K2H5Z2','New York', 'NY');
INSERT INTO POSTAL_CODE VALUES ('K3H5Z6','Matsubara', 'OS');
INSERT INTO POSTAL_CODE VALUES ('K2H5T1','Chuo-ku', 'TK');
INSERT INTO POSTAL_CODE VALUES ('K2H5K2','Meguro', 'TK');

--INSERT INTO ADDRESS_INFO VALUES (address id, country, address_line, postal_code);
-- id is 5 digits
INSERT INTO ADDRESS_INFO VALUES(80085,'Canada','32 Terry Fox Dr.', 'K2T1J1');
INSERT INTO ADDRESS_INFO VALUES(69420,'Canada','1116 Speedvale Ave', 'K2A2S3');
INSERT INTO ADDRESS_INFO VALUES(92313,'Canada','10 Longfields Dr', 'K2J2M6');
INSERT INTO ADDRESS_INFO VALUES(12003,'Canada','58 Greenbank Rd', 'K2J0B5');
INSERT INTO ADDRESS_INFO VALUES(22192,'Canada','15 Carling Ave.', 'K2B8C1');
INSERT INTO ADDRESS_INFO VALUES(18734,'Canada','36 Forester Cres', 'K2H5Z1');
INSERT INTO ADDRESS_INFO VALUES (12345, 'United States', '34th St New York', '10001');
INSERT INTO ADDRESS_INFO VALUES (54321, 'Japan', '4-23-7 Matsubara', '580-0015');
INSERT INTO ADDRESS_INFO VALUES (67890, 'Japan', '6-17 Nishigoken', '104-0031');
INSERT INTO ADDRESS_INFO VALUES (09876, 'Japan', '2-45 Minamisendanishimachi', '153-0051');

-- INSERT INTO BILLING_INFO VALUES (id, card_number, card_name, expiry, cvc, card_address);
-- id is 6 digits
-- card number is 16 digits
-- expiry is in 'MM/YYYY' format
-- cvc is 3 digits
-- card_address is 5 digits (an addy that alr exists)
INSERT INTO BILLING_INFO VALUES (001921, 9001991271128112, 'Nicholas Wong', '10/2025', 001, 80085);
INSERT INTO BILLING_INFO VALUES (172390, 5433655111113231, 'Tony Nguyen', '12/2023', 911, 69420);
INSERT INTO BILLING_INFO VALUES (661238, 5123654376521425, 'Michael Connolly', '09/2024', 331, 92313);
INSERT INTO BILLING_INFO VALUES (662341, 6653112344214432, 'Andrew Rivera', '02/2024', 431, 12003);
INSERT INTO BILLING_INFO VALUES (771323, 3321551211232234, 'Jonathan Gallaza', '05/2025', 511, 00192);
INSERT INTO BILLING_INFO VALUES (841121, 4452112362429874, 'Vince Espinoza', '03/2026', 991, 18734);

-- INSERT INTO REGISTERED_USER VALUES (username, password, name, address_info, billing_info);
-- address info is 5
-- billing is 6
INSERT INTO REGISTERED_USER VALUES ('Be3mo028', 'Feb2802', 'Nicholas Wong', 8008, 001921);
INSERT INTO REGISTERED_USER VALUES ('IcarusDwell', 'Oct1702', 'Tony Nguyen', 69420, 172390);
INSERT INTO REGISTERED_USER VALUES ('StealYoApples', 'July0602', 'Michael Connolly', 92313, 661238);
INSERT INTO REGISTERED_USER VALUES ('SilverCinteirion', 'Oct1602', 'Andrew Rivera', 12003, 662341);
INSERT INTO REGISTERED_USER VALUES ('Chaaos', 'Dec1202', 'Jonathan Gallaza', 00192, 771323);
INSERT INTO REGISTERED_USER VALUES ('NinjaAscending', 'Jun1802', 'Vince Espinoza', 18734, 841121);
INSERT INTO REGISTERED_USER VALUES ('DaveChaplle15', 'July0302', 'James Connolly', 92313, 661238);
INSERT INTO REGISTERED_USER VALUES ('mistercanadaman', 'Aug2001', 'Zjay Anical', 80085, 001921);
INSERT INTO REGISTERED_USER VALUES ('Caboose', 'Feb2301', 'Aivan Bolambao', 80085, 001921);
INSERT INTO REGISTERED_USER VALUES ('Jus10yap', 'Apr1602', 'Justine Yap', 12003, 662341);

-- INSERT INTO PUBLISHER VALUES (id, email, name, addy, bank acc);
-- id is 1 dig
-- bank acc is 12 dig
-- addy that alr exists is 5
INSERT INTO PUBLISHER VALUES (1,'sony.interactive@gmail.com', 'Sony Interactive', 12345, 884411289912);
INSERT INTO PUBLISHER VALUES (2,'mi.hoyo@gmail.com', 'Mi Hoyo', 54321, 554322347765);
INSERT INTO PUBLISHER VALUES (3,'konami.group@gmail.com', 'Konmai Group', 67890, 554322347765);
INSERT INTO PUBLISHER VALUES (4,'from.software@gmail.com', 'From Software', 09876, 436388719031);

-- INSERT INTO BOOK VALUES (ISBN, title, author, publisher id, genre, stockQuantity, num_pages, price, publisher percentage);
-- isbn is 5 dig(even if its not)
-- publisher id is 1 dig
-- price is float value
-- percentage is 0.00 - 1.00
INSERT INTO BOOK VALUES (23452, 'God of War', 'Cory Barlog', 1, 'Adventure', 12, 123, 23.99, 0.45);
INSERT INTO BOOK VALUES (32424, 'Genshin Impact', 'Cai Haoyu', 2, 'Fantasy', 34, 444, 5.99, 0.15);
INSERT INTO BOOK VALUES (55321, 'Metal Gear Solid', 'Hideo Kojima', 3, 'Historical Fiction', 200, 254, 64.99, 0.50);
INSERT INTO BOOK VALUES (32151, 'Elden Ring', 'Hidetaka Miyazaki', 4, 'Fantasy', 112, 299, 59.99, 0.30);
INSERT INTO BOOK VALUES (32152, 'Database SQL', 'ABC', 2, 'Education', 0, 565, 79.99, 0.30);


-- INSERT INTO CART_ITEM VALUES (id, isbn, quantity, finished, user_id);
-- id is 8 digits
-- isbn is 5
-- quantity <= stockQuantity of book
-- finished is 0 or 1, 0 = false and 1 = true
-- user_id is username
INSERT INTO CART_ITEM VALUES (44325511, 23452, 10, 1, 'IcarusDwell');
INSERT INTO CART_ITEM VALUES (55128817, 23452, 9, 0, 'StealYoApples');
INSERT INTO CART_ITEM VALUES (11450012, 32424, 30, 0, 'SilverCinteirion');
INSERT INTO CART_ITEM VALUES (09812331, 55321, 189, 0, 'SilverCinteirion');
INSERT INTO CART_ITEM VALUES (77412391, 32424, 30, 1, 'Jus10yap');
INSERT INTO CART_ITEM VALUES (44123145, 32151, 111, 0, 'StealYoApples');

-- creating owners of bookstore
INSERT INTO OWNERS VALUES ('Justine','Justine');
INSERT INTO OWNERS VALUES ('Andrew','Andrew');

-- INSERT INTO ORDER_INFO VALUES (id, expected_ship_date, date_of_receipt, ship_to, placed_by);
-- id is 12 digits
-- both dates are in 'YYYY-MM-DD'
-- ship to is addy alr exists 5 dig
-- placed_by is username of a user
INSERT INTO ORDER_INFO VALUES (154455122231, '2022-12-30', '2022-12-21', 12003, 'Jus10yap');
INSERT INTO ORDER_INFO VALUES (881291235677, '2023-02-11', '2022-12-28', 69420, 'IcarusDwell');

-- INSERT INTO CONTAINS_ORDER VALUES (isbn, order_num, quantity);
-- isbn 5 dig
-- order num 12 dig
INSERT INTO CONTAINS_ORDER VALUES (32424, 154455122231, 4);
INSERT INTO CONTAINS_ORDER VALUES (23452, 881291235677, 2);

SELECT * 
FROM ORDER_INFO 
INNER JOIN (SELECT ADDRESS_INFO.address_line
FROM ADDRESS_INFO ) addy
ON ORDER_INFO.ship_to = ADDRESS_INFO.id
WHERE ORDER_INFO.id LIKE 12003;