-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE products ( 
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

DROP TABLE products;