import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('last_race.db', (err) => {
    if (err) {
        console.error(`Database connection failed: ${err.message}`);
    } else {
        console.log("Successfully connected to the SQLite database!");
    }
});

export default db;