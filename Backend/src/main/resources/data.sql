-- Active: 1703069002107@@127.0.0.1@3306
CREATE DATABASE miniProject DEFAULT CHARACTER SET = 'utf8mb4';

use miniProject;

SELECT * FROM categories;

INSERT INTO
    categories (id, name)
VALUES (1, "MAKANAN"),
    (2, "MINUMAN");

SELECT * FROM categories;

INSERT INTO
    products (
        id, image, price, title, category_id
    )
VALUES (
        1, "lalala", 1000, "MAKANAN 1", 1
    ),
    (
        4, "brohe", 1500, "MAKANAN 2", 1
    ),
    (
        5, "link 1", 500, "MINUMAN 1", 2
    ),
    (
        6, "link 2", 700, "MINUMAN 2", 2
    );

SELECT * FROM products;