CREATE DATABASE file_uploads;

USE file_uploads;

CREATE TABLE images (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(10),
  src MEDIUMBLOB
);

DESCRIBE images;