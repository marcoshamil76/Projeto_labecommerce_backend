-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME())NOT NULL
);

DROP TABLE users;

SELECT * FROM users;

INSERT INTO users (id,name, email, password)
VALUES 
(1,"Elida Paula","epsantos@mhs.com","epsantos1978"),
(2,"Marcos Hamilton","mhsantos@mhs.com","mhsantos1976"),
(3,"Maria Flavia","mfsantos@mhs.com","mfsantos2004"),
(4,"Miguel Henrique","mmsantos@mhs.com","mmsantos2009"),
(5,"Bento Hamilton","bhsantos@mhs.com","bhsantos2009");