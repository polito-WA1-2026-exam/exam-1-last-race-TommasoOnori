import db from './db.js';
import crypto from 'crypto';

export const getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Players WHERE Email = ?`;

        db.get(query, [email], (err, row) => {
            if (err) {
                reject(err);
            } else if (row == undefined) {
                resolve(false);
            } else {
                const user = {
                    id: row.PID,
                    name: row.Name,
                    surname: row.Surname,
                    email: row.Email
                }

                crypto.scrypt(password, row.Salt, 32, (err, hashedPassword) => {
                    if (err) {
                        reject(err);
                    } else {
                        const passwordHex = Buffer.from(row.HashedPassword, 'hex');

                        if (!crypto.timingSafeEqual(passwordHex, hashedPassword)) {
                            resolve(false); // Wrong Password
                        } else {
                            resolve(user);
                        }
                    }
                });
            }
        });
    });
};

export const getUserByID = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Players WHERE PID = ?`;

        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else if (row == undefined) {
                resolve(false);
            } else {
                const user = {
                    id: row.PID,
                    name: row.Name,
                    surname: row.Surname,
                    email: row.Email
                }

                resolve(user);
            }
        });
    });
};