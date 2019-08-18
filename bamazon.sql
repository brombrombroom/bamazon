DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "League of Legend", "PC", 59.99, 10),
	   (2, "WOWrack", "PC", 59.99, 10),
	   (3, "War Craft", "PC", 59.99, 10),
	   (4, "Destiny", "PS4", 59.99, 10),
	   (5, "Drake", "XBOX1", 39.99, 10),
	   (6, "Call Of Duty", "PC", 19.99, 10),
	   (7, "Wireless Controller", "PS4", 49.99, 10),
	   (8, "Wireless Headset", "PS4", 69.99, 10),
	   (9, "Andriod Charging Cable", "MISC", 9.99, 10)
