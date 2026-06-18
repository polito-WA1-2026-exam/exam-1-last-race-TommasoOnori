# Exam #1: "Last Race"
## Student: s354269 ONORI TOMMASO

## React Client Application Routes

- Route `/`: Instructions Page - Containes the Game Rules
- Route `/login`: Login Page - Contains the Login Form
- Route `*`: Fallback Page = Not Found Page
- Route `/game`: Game Page - Shows the Network, Segments and eventually Results
- Route `/scores`: Ranking Page - Showing the Global Ranking

## API Server

- METHOD `/api/something`
  - request parameters and request body content
  - response body content

- GET `/api/sessions/current`
  - req: {
      method: "GET"
    }
  - res(200 OK): {
      id: "_id",
      name: "mock_name",
      surname: "mock_surname",
      username: "mock_username",
      email: "mock_email",
      bestScore: "mock_score"
    }
  - res(401 Unauthorized): {
      error: "No active session."
    }

- POST `/api/sessions`
  - req: {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: {
        "username": "mock_username",
        "password": "mock_password"
      }
    }
  - res(200 OK): {
      id: "_id",
      name: "mock_name",
      surname: "mock_surname",
      username: "mock_username",
      email: "mock_email",
      bestScore: "mock_score"
    }
  - res(401 Unauthorized): {
      error: "Invalid credentials."
    }

- DELETE `/api/sessions/current`
  - req: {
      method: "DELETE"
    }
  - res(200 OK): {}

- GET `/api/network`

- GET `/api/game/setup`

- POST `/api/game/execute`

- GET `/api/ranking`

## Database Tables

- Table `Stations(SID, Name)`
- Table `Lines(LID, Name)`
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
