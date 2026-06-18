import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('last_race.db', (err) => {
    if (err) {
        console.log(`Database connection failed: ${err.message}`);
    } else {
        console.log("Successfully connected to the SQLite database!");
    }
});

/*
Stations Structure:
Line - Action Movies:
    Bullet Train
    Pulp Fiction
    Mission: Impossible

Line - Comedy Movies:
    The Hangover
    Scary Movie
    Zoolander

Line - Horror Movies:
    The Exorcist
    Alien
    Insidious

Line - Sci-Fi Movies:
    Interstellar
    Matrix
    Star Wars
    Guardians of the Galaxy
*/

db.serialize(() => {
    db.run(`PRAGMA foreign_keys = ON`);

    // Table Creation

    db.run(`CREATE TABLE IF NOT EXISTS Lines(
        LID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT UNIQUE NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Stations(
        SID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT UNIQUE NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Stops(
        LID INTEGER NOT NULL,
        SID INTEGER NOT NULL,
        StopNumber INTEGER UNIQUE NOT NULL,

        PRIMARY KEY (LID, SID),
        FOREIGN KEY (LID) REFERENCES Lines(LID),
        FOREIGN KEY (SID) REFERENCES Stations(SID)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Events(
        EID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT UNIQUE NOT NULL,
        Description TEXT NOT NULL,
        Value INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Players(
        PID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Surname TEXT NOT NULL,
        BestScore INTEGER,
        Email TEXT UNIQUE NOT NULL,
        HashedPassword TEXT NOT NULL,
        Salt TEXT NOT NULL
    )`);

    // Table Population

    db.run(`INSERT OR IGNORE INTO Lines(Name) VALUES
        ('Action'),
        ('Comedy'),
        ('Horror'),
        ('Sci-Fi')
    `);

    db.run(`INSERT OR IGNORE INTO Stations(Name) VALUES
        ('Pulp Fiction'), --1
        ('Bullet Train'), --2
        ('Mission: Impossible'), --3
        
        ('The Hangover'), --4
        ('Scary Movie'), --5
        ('Zoolander'), --6

        ('The Exorcist'), --7
        ('Alien'), --8
        ('Insidious'), --9

        ('Interstellar'), --10
        ('Matrix'), --11
        ('Guardians of the Galaxy'), --12
        ('Star Wars') --13
        
    `);

    db.run(`INSERT OR IGNORE INTO Stops(LID, SID, StopNumber) VALUES
        (1, 1, 1),
        (1, 12, 2),
        (1, 2, 3),
        (1, 3, 4),

        (2, 4, 1),
        (2, 5, 2),
        (2, 12, 3),
        (2, 2, 4),
        (2, 6, 5),

        (3, 7, 1),
        (3, 5, 2),
        (3, 8, 3),
        (3, 9, 4),

        (3, 10, 1),
        (3, 11, 1),
        (3, 8, 1),
        (3, 12, 1),
        (3, 13, 1)
    `);


    db.run(`INSERT OR IGNORE INTO Events(Name, Description, Value) VALUES
        ('Quiet Journey', 'Quiet journey.', 0),
        ('Wrong Platform', 'Wrong platform.', -2),
        ('Kind Passenger', 'You met a kind passenger.', 1),
        ('Ticket Inspection', 'Caught without a valid ticket, you have to pay a small fine.', -4),
        ('Found Pouch', 'You found a dropped coin pouch on the seat.', 4),
        ('Vending Machine Jam', 'You lost a coin trying to buy a snack at the station.', -1),
        ('Busker Performance', 'You generously tipped a talented musician on the platform.', -3),
        ('Lucky Seat', 'You found some spare change left under your train seat.', 3)
    `);
});

db.close((err) => {
    if (err) {
        console.log(`Failed to close database connection: ${err.message}`);
    } else {
        console.log("Connection successfully closed!");
    }
});