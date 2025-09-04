USE COP4331;

CREATE TABLE `Project1`.`Contacts` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName` VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Phone` VARCHAR(50) NOT NULL DEFAULT '' , `Email` VARCHAR(50) NOT NULL DEFAULT '' , `Address` VARCHAR(100) NOT NULL DEFAULT '', `UserID` INT NOT NULL DEFAULT '0' , PRIMARY KEY (`ID`) ) ENGINE = InnoDB;

CREATE TABLE `Project1`.`Users` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName` VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Login` VARCHAR(50) NOT NULL DEFAULT '' , `Password` VARCHAR(50) NOT NULL DEFAULT '' , PRIMARY KEY (`ID`)) ENGINE = InnoDB;

Users = [
    ('Rick','Leinecker','RickL','COP4331'),
    ('Admin','Admin','Admin','Admin'),
    ('Test','Test','Test','Test'),
    ('Corey','Corey','Corey','Corey'),
    (
]
