BEGIN TRANSACTION;

DROP TABLE IF EXISTS POSTAL_CODE;
DROP TABLE IF EXISTS ADDRESS_INFO;
DROP TABLE IF EXISTS BILLING_INFO;
DROP TABLE IF EXISTS REGISTERED_USER;
DROP TABLE IF EXISTS PUBLISHER;
DROP TABLE IF EXISTS BOOK;
DROP TABLE IF EXISTS CART_ITEM;
DROP TABLE IF EXISTS OWNERS;
DROP TABLE IF EXISTS ADDS;
DROP TABLE IF EXISTS REPORT;
DROP TABLE IF EXISTS ORDER_INFO;
DROP TABLE IF EXISTS CONTAINS_ORDER;


CREATE TABLE POSTAL_CODE (
	code VARCHAR(6) PRIMARY KEY,
	city varchar(20) NOT NULL,
	province varchar(2) NOT NULL 
);




CREATE TABLE ADDRESS_INFO (
	id INT PRIMARY KEY,
	country varchar(20) NOT NULL,
	address_line text NOT NULL UNIQUE, 
	postal_code varchar(6) UNIQUE,
	FOREIGN KEY(postal_code) REFERENCES POSTAL_CODE (code) 
);

CREATE TABLE BILLING_INFO (
	id INT PRIMARY KEY,
	card_number varchar(16) NOT NULL UNIQUE,
	card_name varchar(30) NOT NULL, 
	expiry varchar(7) NOT NULL,
	cvc INT(3),
	card_address INT,
	FOREIGN KEY(card_address) REFERENCES ADDRESS_INFO (id) 
);

CREATE TABLE REGISTERED_USER (
	username text PRIMARY KEY,
	password varchar(20) NOT NULL,
	name text NOT NULL,
	address_info INT,
	billing_info INT,
	FOREIGN KEY(address_info) REFERENCES ADDRESS_INFO (id),
	FOREIGN KEY(billing_info) REFERENCES BILLING_INFO (id) 
 
);


CREATE TABLE PUBLISHER (
	id INT PRIMARY KEY,
	publisher_email text NOT NULL UNIQUE,
	publisher_name text NOT NULL,
	publisher_address_id INT,
	bank_account INT(12) NOT NULL,
	FOREIGN KEY (publisher_address_id) REFERENCES ADDRESS_INFO (id)
);

CREATE TABLE BOOK (
	ISBN INT PRIMARY KEY,
	title varchar(50) NOT NULL,
	author varchar(30) NOT NULL,
	publisher_id INT,
	genre varchar(20) NOT NULL,
	stockQuantity SMALLINT(6) NOT NULL,
	num_pages INT NOT NULL,
	price FLOAT NOT NULL,
	publisher_percentage FLOAT NOT NULL,
	FOREIGN KEY (publisher_id) REFERENCES PUBLISHER (id)
);


CREATE TABLE CART_ITEM (
	id INT,
	book_isbn INT,
	quantity INT DEFAULT 0,
	finished BOOL DEFAULT 0,
	user_id text,
	FOREIGN KEY(user_id) REFERENCES REGISTERED_USER (username),
	FOREIGN KEY (book_isbn) REFERENCES BOOK (ISBN)
);


CREATE TABLE OWNERS (
	username VARCHAR(20) PRIMARY KEY,	 -- unique username of the owner's login
	password VARCHAR(20) NOT NULL				 -- password corresponding to the owner's username 
);


CREATE TABLE ADDS (
	book_isbn INT,
	owner_user VARCHAR(20),
	PRIMARY KEY(book_isbn, owner_user),
	FOREIGN KEY (book_isbn) REFERENCES BOOK (ISBN),
	FOREIGN KEY (owner_user) REFERENCES OWNERS (username)
);


CREATE TABLE REPORT (
	id INT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	sales INT NOT NULL,
	date DATE NOT NULL,
	report_access VARCHAR(20),
	FOREIGN KEY (report_access) REFERENCES OWNERS (username) 
);

CREATE TABLE ORDER_INFO (
	id INT PRIMARY KEY,
	expected_ship_date DATE NOT NULL,
	date_of_receipt DATE NOT NULL,
	ship_to INT NOT NULL,
	placed_by text NOT NULL,
	FOREIGN KEY (ship_to) REFERENCES ADDRESS_INFO (id),
	FOREIGN KEY (placed_by) REFERENCES REGISTERED_USER (username)
);

CREATE TABLE CONTAINS_ORDER (
	book_isbn INT,
	order_number INT,
	quantity INT NOT NULL,
	PRIMARY KEY(book_isbn, order_number),
	FOREIGN KEY (book_isbn) REFERENCES BOOK (ISBN),
	FOREIGN KEY (order_number) REFERENCES ORDER_INFO (id)
);


COMMIT;