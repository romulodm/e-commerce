CREATE TABLE users (
  Id int(10) unsigned NOT NULL AUTO_INCREMENT,
  Username varchar(100) NOT NULL,
  Email varchar(150) NOT NULL,
  Password varchar(1000) NOT NULL,
  isAdmin TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (Id),
  UNIQUE Email (Email ASC));
  
CREATE TABLE products (
  Id int(15) unsigned NOT NULL AUTO_INCREMENT,
  Title varchar(100) NOT NULL,
  Description varchar(1000) NOT NULL,
  Img varchar(500) NOT NULL,
  Price float(10) NOT NULL,
  Category JSON NOT NULL,
  Sizes JSON NOT NULL,
  Quantity JSON NOT NULL,
  PRIMARY KEY (Id));
  
CREATE TABLE cart (
  User_id INT NOT NULL,
  Products JSON,
  Quantity JSON,
  PRIMARY KEY (User_id));
  
CREATE TABLE orders (
  User_id INT NOT NULL,
  Products JSON,
  Quantity JSON,
  Amount float(15) NOT NULL,
  Adress JSON,
  Status VARCHAR(50) DEFAULT "Pending",
  PRIMARY KEY (User_id));
