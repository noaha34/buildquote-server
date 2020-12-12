DROP DATABASE IF EXISTS buildquote;
DROP USER IF EXISTS buildquote_user@localhost;

CREATE DATABASE buildquote CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER buildquote_user@localhost IDENTIFIED BY 'r3s+pa$$w0rdNi66a!';

GRANT ALL PRIVILEGES ON buildquote.* TO buildquote_user@localhost;
