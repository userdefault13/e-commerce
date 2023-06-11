-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

-- DROP TABLES IF EXISTS
DROP TABLE IF EXISTS ProductTags;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;

-- CREATE TABLES
CREATE TABLE Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL
);

CREATE TABLE Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 10,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE
);

CREATE TABLE Tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(50) NOT NULL
);

CREATE TABLE ProductTags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  tag_id INT,
  FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES Tags(id) ON DELETE CASCADE
);
