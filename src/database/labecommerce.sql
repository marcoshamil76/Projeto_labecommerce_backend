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

INSERT INTO users(id, email,password)
VALUES
    (6,"lpsantos@mhs.com","lpsantos1954");

INSERT INTO products (id,name, price,category)
VALUES
    (1,"capacete",346.99,"security"),
    (2,"oculos",546.99,"security"),
    (3,"luvas",76.99,"security"),
    (4,"meias",46.99,"clothes"),
    (5,"bretelle",246.99,"clothes");

INSERT INTO products (id,name,price,category)
VALUES
    (7,"caramanhola",105.00,"acessories");

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products WHERE name = 'meias';

SELECT * FROM products WHERE id = 4;


DELETE  FROM products WHERE id = 6;

DELETE FROM users WHERE id = 6;

UPDATE  users set email='lpssantos@mhs.com' WHERE id = 6;


SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC;

SELECT * FROM products ORDER BY price ASC
LIMIT 3;

SELECT * FROM products WHERE price >20 AND price <100;

SELECT * FROM products
WHERE  category= "clothes" or category = 'security'
ORDER BY price ASC
LIMIT 2 offset 1;


-- relações SQL
-- Criação da tabela de pedidos
-- nome da tabela: purchases
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- total_price (REAL, único e obrigatório)
-- paid (INTEGER e obrigatório)
-- delivered_at (TEXT e opcional)
-- buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)
-- Observações
-- A coluna paid será utilizada para guardar uma lógica booleana. O SQLite recomenda o uso do número 0 para false e 1 para true.
-- Os pedidos começam com paid valendo 0 e quando o pagamento for finalizado, se atualiza para 1.

-- A coluna delivered_at será utilizada para gerenciar a data de entrega do pedido. Ela é opcional, porque sempre começará sem valor ao criar um pedido, ou seja, null.
-- O SQLite recomenda utilizar TEXT para lidar com strings no formato ISO8601 "aaaa-mm-dd hh:mm:sss". Lembre-se da existência da função nativa DATETIME para gerar datas nesse formato.

CREATE TABLE purchases (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
total_price REAL UNIQUE NOT NULL,  
paid INTEGER NOT NULL,
delivered_at TEXT,
buyer_id TEXT NOT NULL,
Foreign Key (buyer_id) REFERENCES users(id)

);

INSERT INTO purchases (id, total_price,paid,buyer_id)
VALUES
        (3,700.60,"0",3),
        (4,800,"0",3),
        (5,2850,"0",5),
        (6,120.50,"0",4),
        (7,999.99,"0",5);

INSERT INTO purchases (id, total_price,paid,buyer_id)
VALUES 
        (8,99.99,"0",1),
        (9,299.99,"0",2);

DROP TABLE purchases;

SELECT * FROM purchases;

UPDATE purchases Set delivered_at= DATETIME('now')
WHERE id = 3;
-- UPDATE  users set email='lpssantos@mhs.com' WHERE id = 6;

SELECT * FROM purchases
INNER JOIN users
ON  purchases.buyer_id = users.id;

SELECT purchases.*, purchases.total_price as Total FROM users INNER JOIN purchases on buyer_id = users.id;

-- Relations SQL II

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    Foreign Key (purchase_id) REFERENCES purchases(id),
    Foreign Key (product_id) REFERENCES products(id)

);
DROP TABLE purchases_products;

SELECT * FROM users;

INSERT INTO purchases_products (purchase_id, product_id,quantity)
VALUES
    (3,2,3),
    (3,5,10),
    (5,4,2),
    (6,5,2),
    (6,7,2);
    
   
SELECT
    purchases_products.purchase_id AS CodigoCompra,
    products.name AS Produto,
    purchases_products.quantity AS "Total Comprado",
    users.email AS "Email comprador"
    FROM products
    INNER JOIN purchases_products
    ON products.id = purchases_products.product_id
    INNER JOIN purchases
    ON purchases.id = purchases_products.purchase_id
    INNER JOIN users
    ON purchases.buyer_id = users.id
    ORDER BY purchases_products.purchase_id ASC
    ;
    
SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;






