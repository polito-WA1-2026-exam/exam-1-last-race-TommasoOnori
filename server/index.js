import express from "express";
import sqlite3 from 'sqlite3';
import session from 'express-session';
import cors from 'cors';
import passport from './passport.js';

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: "last_race_secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.authenticate('session'));

app.use(express.json());

const db = new sqlite3.Database('last_race.db', (err) => {
  if (err) {
    console.error(`Database connection failed: ${err.message}`);
  } else {
    console.log("Successfully connected to the SQLite database!");
  }
});

// --- Authentication APIs ---

app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Unauthenticated user." });
  }
});

app.post('/api/sessions', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ error: info });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
});

app.delete('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.logout(() => {
      res.end();
    });
  }
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Unauthenticated user." });
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});