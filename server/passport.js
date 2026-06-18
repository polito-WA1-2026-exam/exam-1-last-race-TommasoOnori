import passport from 'passport';
import LocalStrategy from 'passport-local';

import { getUser, getUserByID } from './user_dao.js';

passport.use(new LocalStrategy(
    async function verify(username, password, callback) {
        try {
            const user = await getUser(username, password);

            if (!user) {
                return callback(null, false, { message: "Invalid credentials." });
            }

            return callback(null, user);
        } catch (err) {
            return callback(err);
        }
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await getUserByID(id);
        cb(null, user);
    } catch (err) {
        cb(err, null);
    }
});

export default passport;