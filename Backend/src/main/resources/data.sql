-- Active: 1703069002107@@127.0.0.1@3306
CREATE DATABASE miniProject DEFAULT CHARACTER SET = 'utf8mb4';

use miniProject;

CREATE TABLE CATEGORIES (
    ID BIGINT NOT NULL AUTO_INCREMENT, NAME VARCHAR(255), PRIMARY KEY (ID)
);

SHOW CREATE TABLE CATEGORIES;

CREATE TABLE PRODUCTS (
    ID BIGINT NOT NULL AUTO_INCREMENT, CATEGORY_ID BIGINT, TITLE VARCHAR(255), PRICE BIGINT, IMAGE VARCHAR(255), PRIMARY KEY (ID), Foreign Key FK_PRODUCTS_CATEGORIES (CATEGORY_ID) REFERENCES CATEGORIES (ID)
);

SHOW CREATE TABLE PRODUCTS;

CREATE TABLE TRANSACTIONS (
    ID BIGINT NOT NULL AUTO_INCREMENT, TRANSACTION_DATE DATETIME, TOTAL_AMOUNT BIGINT, TOTAL_PAY BIGINT, PRIMARY KEY (ID)
);

SHOW CREATE TABLE TRANSACTIONS;

CREATE TABLE TRANSACTION_DETAILS (
    ID BIGINT NOT NULL AUTO_INCREMENT, TRANSACTION_ID BIGINT, PRODUCT_ID BIGINT, QUANTITY BIGINT, SUBTOTAL BIGINT, PRIMARY KEY (ID), Foreign Key FK_TRANSACTION_DETAILS_TRANSACTION (TRANSACTION_ID) REFERENCES TRANSACTIONS (ID), Foreign Key FK_TRANSACTION_DETAILS_PRODUCTS (PRODUCT_ID) REFERENCES PRODUCTS (ID)
)

SELECT * FROM categories;

INSERT INTO
    CATEGORIES (ID, NAME)
VALUES ("1", "PROCESSOR"),
    ("2", "GPU"),
    ("3", "MOTHERBOARD");

SELECT * FROM categories;

INSERT INTO
    PRODUCTS (
        ID, CATEGORY_ID, PRICE, TITLE, IMAGE
    )
VALUES (
        "1", "1", "9500000", "INTEL CORE i9 14900F", "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/1/10/3db83939-f2d4-408c-9c7d-37e2a9d80cb2.jpg"
    ),
    (
        "2", "1", "10050000", "INTEL CORE i9 14900K", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/10/24/081c4d1a-131a-4ddf-afec-a3e1b43d6f56.jpg"
    ),
    (
        "3", "1", "7300000", "INTEL CORE i7 14700K", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/11/4/642d8950-76ba-4ffe-925b-467e7288b1cd.jpg"
    ),
    (
        "4", "1", "7200000", "INTEL CORE i7 13700K", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/11/c86b2e51-a147-468f-9737-259f7e8e0ffb.jpg"
    ),
    (
        "5", "1", "10300000", "AMD RYZEN 9 7950X3D", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/3/17/ba3ef257-8457-45ed-a846-a5d50422cc08.jpg"
    ),
    (
        "6", "1", "9050000", "AMD RYZEN 9 7950X", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/6/141aff66-39fe-42ca-92d0-6a11245a6ed6.jpg"
    ),
    (
        "7", "1", "6470000", "AMD RYZEN 7 7800X3D", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/5/3/a98d0a40-7cb6-43d4-bcb5-ada050b9d5d2.jpg"
    ),
    (
        "8", "1", "3790000", "AMD RYZEN 5 7600X", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/2/28/f68d5114-0e59-4754-9da6-db40421e3df6.jpg"
    ),
    (
        "9", "2", "37950000", "ASUS ROG STRIX GEFORCE RTX 4090 OC EDITION", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/3/25/227cfe25-f5a2-423b-85e8-5605beb26668.jpg"
    ),
    (
        "10", "2", "35920000", "MSI GEFORCE RTX 4090 SUPRIM X", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/7/8/aebfa68d-cb40-4641-875f-1459089250ef.jpg"
    ),
    (
        "11", "2", "16800000", "GIGABYTE GEFORCE RTX 4070TI SUPER AERO OC", "https://images.tokopedia.net/img/cache/900/VqbcmM/2024/1/24/887a6db3-f665-4e8d-93f5-18c66187fac5.jpg"
    ),
    (
        "12", "2", "9290000", "MSI GEFORCE RTX 4060 TI GAMING X SLIM WHITE", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/8/18/c21e2153-0dd1-48b8-8b52-47165d6ed393.jpg"
    ),
    (
        "13", "2", "8760000", "GIGABYTE GEFORCE RTX 4060 TI GAMING OC", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/7/30/bfea95cf-b3b5-463b-9e99-3bbfd4f45fc1.jpg"
    ),
    (
        "14", "3", "13970000", "ASUS ROG MAXIMUS Z790 FORMULA", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/10/24/757a2ebd-effe-4686-a7de-d6ab9fa1a652.jpg"
    ),
    (
        "15", "3", "12770000", "MSI MEG Z790 ACE MAX", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/12/27/0aa8cc93-d39a-407c-9ac0-ef2bc3e8fbdf.jpg"
    ),
    (
        "16", "3", "9580000", "ASUS ROG STRIX X670-E GAMING WIFI", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/2/19/1e047f8a-31b9-443c-a641-45dbbae00ad1.jpg"
    ),
    (
        "17", "3", "6180000", "GIGABYTE X670 AORUS ELITE AX ", "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/9/27/36180820-3a3e-4248-a3f0-0176795e55af.jpg"
    ),
    (
        "18", "3", "5100000", "ASROCK X670E PRO RS", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/2/19/3783e80c-7632-4133-8eb1-4dbb0a5cdefb.jpg"
    ),
    (
        "19", "3", "4180000", "ASROCK B650 LIVEMIXER", "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/2/14/ce40d0fd-71b9-4b8e-a233-2867adaa38f4.jpg"
    );

SELECT * FROM products;

TRUNCATE TABLE TRANSACTION_DETAILS;

TRUNCATE TABLE TRANSACTIONS;

TRUNCATE TABLE PRODUCTS;

TRUNCATE TABLE CATEGORIES;

use miniproject;

SELECT * FROM products WHERE category_id = 1;

use miniproject

SELECT t.*
FROM
    transactions AS t
    JOIN transaction_details AS td ON t.id = td.transaction_id
    JOIN products AS p on td.product_id = p.id
WHERE
    td.product_id in (1)
GROUP BY
    t.id;

SELECT t.*, td.product_id, p.title
FROM
    transactions AS t
    JOIN transaction_details AS td ON t.id = td.transaction_id
    JOIN products AS p on td.product_id = p.id
where
    p.id = 1;