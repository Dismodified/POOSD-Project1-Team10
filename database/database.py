USE COP4331;

CREATE TABLE Contacts ( ID INT NOT NULL AUTO_INCREMENT , FirstName VARCHAR(50) NOT NULL DEFAULT '' , LastName VARCHAR(50) NOT NULL DEFAULT '' , Phone VARCHAR(50) NOT NULL DEFAULT '' , Email VARCHAR(50) NOT NULL DEFAULT '' , UserID INT NOT NULL DEFAULT '0' , PRIMARY KEY (ID) ) ENGINE = InnoDB;

CREATE TABLE Users ( ID INT NOT NULL AUTO_INCREMENT , FirstName VARCHAR(50) NOT NULL DEFAULT '' , LastName VARCHAR(50) NOT NULL DEFAULT '' , Login VARCHAR(50) NOT NULL DEFAULT '' , Password VARCHAR(50) NOT NULL DEFAULT '' , PRIMARY KEY (ID)) ENGINE = InnoDB;

INSERT INTO Users (FirstName, LastName, Login, Password) VALUES
    ('Lemon','Shark','NBrevirostris','FelipePoey'),
    ('Basking','Shark','CMaximus','JohanGunnerus'),
    ('Spiny','Dogfish','SAcanthias','CarlLinnaeus'),
    ('Titan','Triggerfish','BViridescens','Bloch+Schneider'),
    ('Stone','Triggerfish','PNaufragium','Jordan+Starks'),
    ('Orange-Lined','Triggerfish','BUndulatus','MungoPark'),
    ('Moorish','Idol','ZCornutus','CarlLinnaeus'),
    ('Cuban','Dogfish','SCubensis','LuisHowell-Rivero'),
    ('Mandarin','Dogfish','CBarbifer','ShigehoTanaka'),
    ('Potato','Puffer','TMiurus','GeorgeBoulenger'),
    ('Prickly','Puffer','EGuttifer','EdwardBennett');
    ('Great','White','Test','Test');

INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID) VALUES
    ('Basking','Shark','000-555-1816','bshark@example.com',1),
    ('Lemon','Shark','000-555-1868','lshark@example.com',2),
    ('Spiny','Dogfish','000-555-1758','sdogfish@example.com',2),
    ('Basking','Shark','000-555-1816','bshark@example.com',3),
    ('Cuban','Dogfish','000-555-1936','cdogfish@example.com',3),
    ('Mandarin','Dogfish','000-555-1912','mdogfish@example.com',3),
    ('COT','Starfish','100-555-1758','cots@example.net',4),
    ('Stone','Triggerfish','000-555-1895','strigger@example.com',4),
    ('Orange-Lined','Triggerfish','000-555-1797','oltrigger@example.com',4),
    ('Moorish','Idol','000-555-1759','midol@example.com',4),
    ('Titan','Triggerfish','000-555-1801','ttrigger@example.com',5),
    ('Titan','Triggerfish','000-555-1801','ttrigger@example.com',6),
    ('Moorish','Idol','000-555-1759','midol@example.com',6),
    ('Titan','Triggerfish','000-555-1801','ttrigger@example.com',7),
    ('Orange-Lined','Triggerfish','000-555-1797','oltrigger@example.com',7),
    ('Spiny','Dogfish','000-555-1758','sdogfish@example.com',8),
    ('Spiny','Dogfish','000-555-1758','sdogfish@example.com',9),
    ('Prickly','Puffer','000-555-1831','ppuffer@example.com',10),
    ('Potato','Puffer','000-555-1902','popuffer@example.com',11);

SHOW TABLES;
SELECT COUNT(*) FROM Users;
SELECT COUNT(*) FROM Contacts;








