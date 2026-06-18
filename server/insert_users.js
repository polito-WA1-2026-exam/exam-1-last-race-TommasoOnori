import sqlite3 from 'sqlite3';
import crypto from 'crypto';

const db = new sqlite3.Database('last_race.db', (err) => {
    if (err) {
        console.error(`Database connection failed: ${err}`);
    } else {
        console.log("Successfully connected to SQLite database!")
    }
});

const players = [
    {
        name: "Mario",
        surname: "Rossi",
        email: "mario.rossi@test.it",
        password: "Password2!"
    },
    {
        name: "Luca",
        surname: "Bianchi",
        email: "luca.bianchi@test.it",
        password: "Password3!"
    },
    {
        name: "Tommaso",
        surname: "Onori",
        email: "tommaso.onori@test.it",
        password: "Password1!"
    }
];

db.serialize(() => {
    for (const player of players) {
        const salt = crypto.randomBytes(16).toString('hex');

        let hashedPasswordHex;

        try {
            hashedPasswordHex = crypto.scryptSync(player.password, salt, 32).toString('hex');
        } catch (err) {
            console.error(`A cryptography error occurred: ${err}`);
        }

        const sqlInsertion = `INSERT OR IGNORE INTO Players(Name, Surname, Email, HashedPassword, Salt) VALUES (?, ?, ?, ?, ?)`;

        db.run(sqlInsertion, [player.name, player.surname, player.email, hashedPasswordHex, salt], (err) => {
            if (err) {
                console.error(`User insertion failed: ${err}`);
            } else {
                console.log("--- User successfully inserted! ---");
                console.log(`User credentials:\n- Email: ${player.email}\n- Password: ${player.password}\n`);
            }
        });
    }
});

db.close((err) => {
    if (err) {
        console.error(`Failed to close database connection: ${err.message}`);
    } else {
        console.log("Connection successfully closed!");
    }
});