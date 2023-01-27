-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT UNIQUE PRIMARY KEY, 
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME())NOT NULL
);

DROP TABLE users;

-- DELETE * FROM users WHERE id = 3;

SELECT * FROM users;

INSERT INTO users (id,name, email, password)
VALUES 
("u001","Elida Paula","epsantos@mhs.com","epsantos1978"),
("u002","Marcos Hamilton","mhsantos@mhs.com","mhsantos1976"),
("u003","Maria Flavia","mfsantos@mhs.com","mfsantos2004"),
("u004","Miguel Henrique","mmsantos@mhs.com","mmsantos2009"),
("u005","Bento Hamilton","bhsantos@mhs.com","bhsantos2009");