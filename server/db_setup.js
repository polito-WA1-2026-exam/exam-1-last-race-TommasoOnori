import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('last_race.db', (err) => {
    if (err) {
        console.error(`Database connection failed: ${err.message}`);
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
        StopNumber INTEGER NOT NULL,

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
        Email TEXT UNIQUE NOT NULL,
        HashedPassword TEXT NOT NULL,
        Salt TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Games(
        GID INTEGER PRIMARY KEY AUTOINCREMENT,
        PID INTEGER NOT NULL,
        Score NOT NULL,
        Date TEXT NOT NULL
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

        (4, 10, 1),
        (4, 11, 2),
        (4, 8, 3),
        (4, 12, 4),
        (4, 13, 5)
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

    db.run(`INSERT OR IGNORE INTO Games(PID, Score, Date) VALUES
        (1, 17, '2026-06-15 10:00:00'),
        (1, 0, '2026-06-15 10:30:00'),
        (1, 20, '2026-06-16 11:00:00'),

        (2, 21, '2026-06-15 14:00:00'),
        (2, 24, '2026-06-18 09:00:00')
    `);
});

db.close((err) => {
    if (err) {
        console.error(`Failed to close database connection: ${err.message}`);
    } else {
        console.log("Connection successfully closed!");
    }
});