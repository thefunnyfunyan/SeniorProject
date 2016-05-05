/**
 * Created by Brandon on 5/4/2016.
 */


var sqlite3 = require('sqlite3'),
    file = './Database/RTAT.sqlite3'
    db = new sqlite3.Database(file);

function createDatabases(){
    db.serialize(function(){
        db.run('DROP TABLE IF EXISTS User');
        db.run("CREATE TABLE User (UserId INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(100))");
        db.run('DROP TABLE IF EXISTS Unit');
        db.run("CREATE TABLE Unit (UnitId INTEGER PRIMARY KEY AUTOINCREMENT, ParentUnit INTEGER, FOREIGN KEY (ParentUnit) REFERENCES Unit(UnitId))")
        db.run('DROP TABLE IF EXISTS UserUnit');
        db.run("CREATE TABLE UserUnit (UserId INTEGER, UnitId INTEGER, FOREIGN KEY (UserId) REFERENCES User(Id), FOREIGN KEY (UnitId) REFERENCES Unit(UnitId))")
        db.run('DROP TABLE IF EXISTS Location');
        db.run('CREATE TABLE Location (Latitude REAL, Longitude REAL, UserId INTEGER, Time TIMESTAMP, FOREIGN KEY (UserId) REFERENCES User(UserId))')
    })
}

createDatabases();
