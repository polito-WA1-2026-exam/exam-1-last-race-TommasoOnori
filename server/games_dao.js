import db from './db.js';

export const insertGame = (pid, score, date) => {
    return new Promise((resolve, reject) => {
        const insGame = `INSERT INTO Games(PID, Score, Date) VALUES (?, ?, ?)`;

        db.run(insGame, [pid, score, data], (err) => {
            if (err) reject(err);

            resolve(true);
        });
    });
};