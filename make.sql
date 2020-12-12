DROP DATABASE IF EXSISTS buildquote;
DROP USER IF EXISTS buildquote_user@localhost;
CREATE DATABASE buildquote CHARACTER SET utf8mbf COLLAT utf8mb4_unicode_ci;
CREATE USER buildquote_user@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON buildquote.* TO buildquote_user@locahost;
