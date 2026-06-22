import express from "express";
import db from './db.js';
import session from 'express-session';
import cors from 'cors';
import passport from './passport.js';
import dayjs from 'dayjs';

import { getStations, getLines, getSegments, getEndpointStations } from './network_dao.js';
import { getEvents } from './events_dao.js';
import { insertGame, getRanking } from './games_dao.js';

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

// ===== Authentication APIs =====

app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});

app.post('/api/sessions', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
      return res.json(req.user);
    });
  })(req, res);
});

app.delete('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout(() => {
      res.status(200).end();
    });
  }
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Unauthenticated user." });
}

// ===== Game APIs =====

app.get('/api/network/topology', isLoggedIn, async (req, res) => {
  try {
    const segments = await getSegments();
    res.status(200).json({ segments });
  } catch (err) {
    res.status(500).json({ error: "Network retrieval error." });
  }
});

app.get('/api/game/setup', isLoggedIn, async (req, res) => {
  try {
    const endpoints = await getEndpointStations();
    res.status(200).json(endpoints);
  } catch (err) {
    res.status(500).json({ error: "Endpoints retrieval error." })
  }
});

app.post('/api/games', isLoggedIn, async (req, res) => {
  const saveGameAndRespond = async (score, valid, events = []) => {
    const userId = req.user.id;
    const currentDate = dayjs().format('YYYY-MM-DD HH:mm:00');

    try {
      await insertGame(userId, score, currentDate);
      return res.status(200).json({ valid, events, finalScore: score });
    } catch (err) {
      return res.status(500).json({ error: "Database game-insertion error." })
    }
  };

  const { route, endpoints } = req.body;

  if (!route || route.length == 0) return await saveGameAndRespond(0, false);

  const [start, end] = endpoints

  if (route[0].from !== start || route[route.length - 1].to !== end) {
    return await saveGameAndRespond(0, false);
  }

  for (let i = 0; i < route.length - 1; i++) {
    if (route[i].to !== route[i + 1].from) {
      return await saveGameAndRespond(0, false);
    }
  }

  for (let i = 0; i < route.length; i++) {
    for (let j = 0; j < route.length; j++) {
      if (j != i) {
        const s1 = route[i];
        const s2 = route[j];

        if ((s1.from === s2.from && s1.to === s2.to) || (s1.from === s2.to && s1.to === s2.from)) {
          return await saveGameAndRespond(0, false);
        }
      }
    }
  }

  try {
    const allEvents = await getEvents();
    let routeEvents = [];

    for (const segment of route) {
      routeEvents.push(allEvents[Math.floor(Math.random() * allEvents.length)]);
    }

    const INITIAL_SCORE = 20;
    let finalScore = INITIAL_SCORE;

    for (const event of routeEvents) {
      finalScore += event.Value;
    }

    if (finalScore < 0) {
      finalScore = 0;
    }

    return await saveGameAndRespond(finalScore, true, routeEvents);
  } catch (err) {
    return res.status(500).json({ error: "Events retrieval error." });
  }
});

app.get('/api/ranking', isLoggedIn, async (req, res) => {
  try {
    const ranking = await getRanking();
    res.status(200).json(ranking);
  } catch (err) {
    res.status(500).json({ error: "Ranking retrieval error." });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});