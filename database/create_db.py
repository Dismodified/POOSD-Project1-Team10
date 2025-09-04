USE COP4331;

CREATE TABLE `Project1`.`Contacts` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName` VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Phone` VARCHAR(50) NOT NULL DEFAULT '' , `Email` VARCHAR(50) NOT NULL DEFAULT '' , `Address` VARCHAR(100) NOT NULL DEFAULT '', `UserID` INT NOT NULL DEFAULT '0' , PRIMARY KEY (`ID`) ) ENGINE = InnoDB;

CREATE TABLE `Project1`.`Users` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName` VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Login` VARCHAR(50) NOT NULL DEFAULT '' , `Password` VARCHAR(50) NOT NULL DEFAULT '' , PRIMARY KEY (`ID`)) ENGINE = InnoDB;

INSERT INTO Users (FirstName, LastName, Login, Password) VALUES
    ('Rick','Leinecker','RickL','COP4331'),
    ('Admin','Admin','Admin','Admin'),
    ('Test','Test','Test','Test'),
    ('Corey','Corey','Corey','Corey'),
    ('Sam','Hill','SamH','Test');

INSERT INTO Contacts (FirstName, LastName, Phone, Email, Address, UserID) VALUES
('Corey','Corey','123-456-7890','sample@ucf.edu','012 Street, City, State',1),
('Corey','Corey','123-456-7890','sample@ucf.edu','012 Street, City, State',2),
('Corey','Corey','123-456-7890','sample@ucf.edu','012 Street, City, State',3),
('Sam','Hill','987-654-3210','test@ucf.edu','345 Street, City, State',1),
('Sam','Hill','987-654-3210','test@ucf.edu','345 Street, City, State',2),
('Sam','Hill','987-654-3210','test@ucf.edu','345 Street, City, State',3),
('UniqueTo','Rick','111-222-3333','1@ucf.edu','0 Ave, City, State',1),
('UniqueTo','Admin','444-555-6666','2@ucf.edu','1 Ave, City, State',2),
('UniqueTo','Test','777-888-9999','3@ucf.edu','3 Street, City, State',3);

SHOW TABLES;
SELECT COUNT(*) FROM Users;
SELECT COUNT(*) FROM Contacts;
