USE COP4331;

CREATE TABLE Contacts ( ID INT NOT NULL AUTO_INCREMENT , FirstName VARCHAR(50) NOT NULL DEFAULT '' , LastName VARCHAR(50) NOT NULL DEFAULT '' , Phone VARCHAR(50) NOT NULL DEFAULT '' , Email VARCHAR(50) NOT NULL DEFAULT '' , UserID INT NOT NULL DEFAULT '0' , PRIMARY KEY (ID) ) ENGINE = InnoDB;

CREATE TABLE Users ( ID INT NOT NULL AUTO_INCREMENT , FirstName VARCHAR(50) NOT NULL DEFAULT '' , LastName VARCHAR(50) NOT NULL DEFAULT '' , Login VARCHAR(50) NOT NULL DEFAULT '' , Password VARCHAR(50) NOT NULL DEFAULT '' , PRIMARY KEY (ID)) ENGINE = InnoDB;

INSERT INTO Users (FirstName, LastName, Login, Password) VALUES
    ('Lemon','Shark','NBrevirostris','FelipePoey'),
    ('Basking','Shark','CMaximus','JohanGunnerus');

INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID) VALUES
('Basking','Shark','000-555-0182','bshark@example.com',1),
('Lemon','Shark','000-555-0187','lshark@example.com',2);

SHOW TABLES;
SELECT COUNT(*) FROM Users;
SELECT COUNT(*) FROM Contacts;






