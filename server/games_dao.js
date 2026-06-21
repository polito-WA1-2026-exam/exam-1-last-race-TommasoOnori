import db from './db.js';

export const insertGame = (pid, score, date) => {
    return new Promise((resolve, reject) => {
        const insGame = `INSERT INTO Games(PID, Score, Date) VALUES (?, ?, ?)`;

        db.run(insGame, [pid, score, date], (err) => {
            if (err) return reject(err);

            resolve(true);
        });
    });
};