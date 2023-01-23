-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE users (
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME())NOT NULL
);

DROP TABLE users;

-- DELETE * FROM users WHERE id = 3;

SELECT * FROM users;

INSERT INTO users (name, email, password)
VALUES 
("Elida Paula","epsantos@mhs.com","epsantos1978"),
("Marcos Hamilton","mhsantos@mhs.com","mhsantos1976"),
("Maria Flavia","mfsantos@mhs.com","mfsantos2004"),
("Miguel Henrique","mmsantos@mhs.com","mmsantos2009"),
("Bento Hamilton","bhsantos@mhs.com","bhsantos2009");