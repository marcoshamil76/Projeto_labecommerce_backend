-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE purchases (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
buyer_id TEXT NOT NULL,
total_price REAL UNIQUE NOT NULL,  
created_at TEXT DEFAULT (DATETIME()) NOT NULL,
paid INTEGER NOT NULL,
Foreign Key (buyer_id) REFERENCES users(id)

);

SELECT * FROM purchases;

DROP TABLE purchases;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    Foreign Key (purchase_id) REFERENCES purchases(id),
    Foreign Key (product_id) REFERENCES products(id)

);
SELECT * FROM purchases_products;

DROP TABLE purchases_products;

INSERT INTO purchases (id,buyer_id,total_price,paid)
VALUES
        (1,1,480,0),
        (2,3,189,1),
        (3,2,600,0),
        (4,5,45,1),
        (5,4,75,0),
        (6,4,200,0);

INSERT INTO purchases_products (purchase_id,product_id,quantity)
VALUES 
        (1,12,1),
        (1,19,1),
        (3,16,1),
        (3,21,1),
        (2,13,1),
        (2,18,1),
        (5,20,1),
        (5,19,1),
        (4,20,5),
        (4,15,1),
        (4,22,1);

SELECT
        purchases_products.purchase_id AS CodigoCompra,
        products.name AS Produto,
        purchases_products.quantity AS "Qtde. Itens",
        purchases.total_price AS "Valor Total",
        users.name AS "Cliente"
        FROM products
        INNER JOIN purchases_products
        ON products.id = purchases_products.product_id
        INNER JOIN purchases
        ON purchases.id = purchases_products.purchase_id
        INNER JOIN users
        ON purchases.buyer_id = users.id
        ORDER BY purchases_products.purchase_id ASC
;
