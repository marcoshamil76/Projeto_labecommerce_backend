-- Active: 1673887085230@@127.0.0.1@3306
CREATE TABLE products ( 
    id TEXT UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image_url TEXT 
);

SELECT * FROM products;

DELETE  FROM products;

DROP TABLE products;

INSERT INTO products (id,name,price,description,image_url)
VALUES
        ("P001","Capacete", 450,"Capacete branco","https://imgs.pontofrio.com.br/1543015405/1xg.jpg?imwidth=292"),
        ("P002","Oculos", 250,"Oculos espelhado","https://a-static.mlcdn.com.br/800x560/oculos-de-sol-ciclismo-masculino-feminino-espelhado-kit-2-esportivo/olistplus/opm27v5344rxfllv/bf290158f1afb1c3be7ed169d1322128.jpeg"),
        ("P003","Luvas", 80,"Luva estofada com gel","https://static3.tcdn.com.br/img/editor/up/266841/LUVAS_JUNTOS.jpg"),
        ("P004","Bretelle", 150,"Bretelle Strava","https://d3ugyf2ht6aenh.cloudfront.net/stores/747/163/products/bretelle-race-carbon-titanium-31-92f7a1fe0a227da2a716394012784133-1024-1024.webp"),
        ("P005","Camisa", 110,"Capacete manga longa","https://images.tcdn.com.br/img/img_prod/662793/camisa_ciclismo_masculina_manga_longa_ziper_full_brasil_amarela_2796_1_97a2a22593a86d0f69e3e3e2e3b70ec1.jpg"),
        ("P006","Camisa", 90,"Camisa manga curta","https://images.tcdn.com.br/img/img_prod/662793/camisa_ciclismo_masculina_manga_curta_ziper_full_brazilian_star_2786_1_a20fdb18bf33356457cddbae9c2a6def.jpg"),
        ("P007","Sapatilha", 350,"Sapatilha MTB","https://cdn.shopify.com/s/files/1/0331/6629/5085/products/1_8ffc2932-f84f-4b5b-a666-b5a4bf27b331_1024x1024@2x.png?v=1668169640"),
        ("P008","Meia", 30,"Meia cano medio","https://http2.mlstatic.com/D_NQ_NP_960696-MLB53376677044_012023-V.jpg"),
        ("P009","Bandana", 15,"Bandana stampada","https://cf.shopee.com.br/file/ac1db6ec0591e3f37337540701097a8b"),
        ("P010","Caramanhola", 99,"Caramanhola 700ml","https://cf.shopee.com.br/file/1a43599952edf3670ba59e45643f113d"),
        ("P011","Bomba", 50,"Bomba pneu compacta","https://www.mxbikes.com.br/imagens_produtos/media/mini-bomba-ar-high-one-gp61s-com-manometro-30254.jpg");