# Exam #1: "Last Race"
## Student: s354269 ONORI TOMMASO

## React Client Application Routes

- Route `/`: Home Page - Containes the Game Rules
- Route `/login/`: Login Page - Contains the Login Form
- Route `*`: Fallback Page = Home Page
- Route `/newtorkmap`: Game Setup Phase - Displays the Underground Network
- Route `planningroute`: Route Planning Phase - Allows player to Select the Segments
- Route `/results`: Result Page - Showing the Final Score
- Route `/scores`: Ranking Page - Showing the Global Ranking

## API Server

- METHOD `/api/something`
  - request parameters and request body content
  - response body content

- GET `/api/sessions/current`
- POST `/api/sessions/current`
- DELETE `/api/sessions/current`

- GET `/api/network`

- GET `/api/game/setup`

- POST `/api/game/execute`

- GET `/api/ranking`

## Database Tables

- Table `Stations(SID, Name)`
- Table `Lines(LID, Color)`
- Table `Stops(LID, SID, StopNumber)`
- Table `Events(EID, Name, Description, Value)`
- Table `Player(PID, Name, Surname, BestScore, Email, HashedPassword, Salt)`

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

## Use of AI Tools
Briefly describe whether you used any AI tools (e.g., ChatGPT, GitHub Copilot, Claude) while working on this project, for which purposes (e.g., clarifying concepts, debugging, generating code), and how you verified or adapted their output.
If you did not use any AI tools, simply state so.
