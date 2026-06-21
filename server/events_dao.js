import db from './db.js';

export const getEvents = () => {
    return new Promise((resolve, reject) => {
        const queryEvents = `SELECT * FROM Events`;

        db.all(queryEvents, [], (err, events) => {
            if (err) return reject(err);
            return resolve(events);
        });
    });
};