-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE products ( 
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES 
(1,"epsantos@mhs.com","epsantos1978"),
(2,"mhsantos@mhs.com","mhsantos1976"),
(3,"mfsantos@mhs.com","mfsantos2004"),
(4,"mmsantos@mhs.com","mmsantos2009"),
(5,"bhsantos@mhs.com","bhsantos2009");

INSERT INTO products (id,name, price,category)
VALUES
    (1,"capacete",346.99,"security"),
    (2,"oculos",546.99,"security"),
    (3,"luvas",76.99,"security"),
    (4,"meias",46.99,"clothes"),
    (5,"bretelle",246.99,"clothes");

SELECT * FROM users;

SELECT * FROM products;

