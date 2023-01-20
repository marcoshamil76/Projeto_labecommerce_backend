-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE purchases (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
buyer_id TEXT NOT NULL,
total_price REAL UNIQUE NOT NULL,  
created_at TEXT,
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