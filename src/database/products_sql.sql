-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE products ( 
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image_url TEXT 
);

SELECT * FROM products;

DELETE  FROM products;

DROP TABLE products;

INSERT INTO products (name,price,description)
VALUES
        ("Capacete", 450,"Capacete branco"),
        ("Oculos", 250,"Oculos espelhado"),
        ("Luvas", 80,"Luva estofada com gel"),
        ("Bretelle", 150,"Bretelle Strava"),
        ("Camisa", 110,"Capacete manga longa"),
        ("Camisa", 90,"Camisa manga curta"),
        ("Sapatilha", 350,"Sapatilha MTB"),
        ("Meia", 30,"Meia cano medio"),
        ("Bandana", 15,"Bandana stampada"),
        ("Caramanhola", 99,"Caramanhola 700ml"),
        ("Bomba", 50,"Bomba pneu compacta");