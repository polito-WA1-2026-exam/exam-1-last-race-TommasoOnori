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

export const getRanking = () => {
    return new Promise((resolve, reject) => {
        const queryRank = `
            SELECT
                RANK() OVER(ORDER BY Max(Games.Score) DESC) as Rank,
                Players.Email,
                MAX(Games.Score) as MaxScore
            FROM Games JOIN Players ON Games.PID = Players.PID
            GROUP BY Players.Email
        `;

        db.all(queryRank, [], (err, ranks) => {
            if (err) return reject(err);

            return resolve(ranks);
        });
    });
};