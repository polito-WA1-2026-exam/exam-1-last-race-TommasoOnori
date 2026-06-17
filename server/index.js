import express from "express";
import sqlite3 from 'sqlite3';

const app = express();
const port = 3001;

app.use(express.json());

const db = new sqlite3.Database('last_race.db', (err) => {
  if (err) {
    console.log(`Connection failed: ${err.message}`);
  } else {
    console.log("Successfully connected to the SQLite database!");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});