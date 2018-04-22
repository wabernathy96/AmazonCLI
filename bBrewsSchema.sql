DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bbrews;

USE bbrews;

DROP TABLE IF EXISTS products;

CREATE TABLE inventory(
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  coffee_name VARCHAR(50) NOT NULL,
  coffee_type VARCHAR(100) NOT NULL,
  price DECIMAL ('$' + 4,2) default (0.00),
  coffee_a INT(5) NOT NULL default (0),
  stock_q INT(5) NOT NULL default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO inventory (coffee_name, coffee_type, price, coffee_a, stock_q) 
VALUES ('Outlaws','Houston Brewed Light Blend','2.50','12 oz cup','60'), ('Meta','Americano','3.00','12 oz cup','60'), ('Bombs Away','Light English','4.00','12 oz cup','60'), ('Fire In The Hole','Medium Australian', '3.00','12 oz cup','60'), ('Soul Balance','Light Japanese','10.00','12 oz cup','30'), ('The Quick','Espresso Shot','.80','1 oz','50'), ('The Dead','Extra Caffeinated Espresso Shot','1.60','1 oz','50'), ('Zen','Mango Pineapple Green Tea Mix','3.00','16 oz cup','60'), ('C9','Black Tea','4.00','16 oz cup','60'), ('Sweet Baby Diva','Milk Tea','4.00','16 oz cup','60'), ('Shield Up','Green Antioxidant Smoothie','5.00','16 oz cup','50');



