# Exam #1: "Last Race"
## Student: s354269 ONORI TOMMASO

## React Client Application Routes

- Route `/` : Instructions Page - Containes the Game Rules
- Route `/login` : Login Page - Contains the Login Form
- Route `/game` : Game Page - Shows the Network, Segments and eventually Results
- Route `/scores` : Ranking Page - Showing the Global Ranking
- Route `*` : Fallback Page - Not Found Page

## API Server

- METHOD `/api/something`
  - request parameters and request body content
  - response body content

### Authentication API

GET `/api/sessions/current`
  ```json
  req: {
    method: "GET"
  }
  ```
  ```json
  res(200 OK): {
    id: "_id",
    name: "mock_name",
    surname: "mock_surname",
    username: "mock_username",
    email: "mock_email",
    bestScore: "mock_score"
  }

  res(401 Unauthorized): {
    error: "No active session."
  }
  ```

POST `/api/sessions`
  ```json
  req: {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: {
      "username": "mock_username",
      "password": "mock_password"
    }
  }
  ```
  ```json
  res(200 OK): {
    id: "_id",
    name: "mock_name",
    surname: "mock_surname",
    username: "mock_username",
    email: "mock_email",
    bestScore: "mock_score"
  }

  res(401 Unauthorized): {
    error: "Invalid credentials."
  }
  ```

DELETE `/api/sessions/current`
  ```json
  req: {
      method: "DELETE"
    }
  ```
  ```json
  res(200 OK): {}
  ```

### Game API

GET `/api/network`

GET `/api/game/setup`

POST `/api/game`

GET `/api/ranking`

## Database Tables

- Table `Stations(SID, Name)`
- Table `Lines(LID, Name)`
- Table `Stops(LID, SID, StopNumber)`
- Table `Events(EID, Name, Description, Value)`
- Table `Player(PID, Name, Surname, BestScore, Email, HashedPassword, Salt)`
- Table `Games(GID, PID, Score, Date)`

## Main React Components

`MyNavbar`
  - Purpose: Handling navigation to different pages.
  - Functionality: Displays the "Last Race" title and a "Log In" button.

`LoginPage`
  - Purpose: Allowing access to protected routes.
  - Functionality: Provides a login form where the user can sumbit credentials to authenticate.

`InstructionsPage`:
  - Purpose:
  - Functionality:

`GamePage`:
  - Purpose:
  - Functionality:

`RankingPage`:
  - Purpose:
  - Functionality:

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

User "Mario Rossi":
```json
{ username: "mario.rossi@test.it", password: "Password1!" }
```

User "Luca Bianchi":
```json
{ username: "luca.bianchi@test.it", password: "Password2!" }
```

User "Tommaso Onori":
```json
{ username: "tommaso.onori@test.it", password: "Password3!" }
```

## Use of AI Tools
Briefly describe whether you used any AI tools (e.g., ChatGPT, GitHub Copilot, Claude) while working on this project, for which purposes (e.g., clarifying concepts, debugging, generating code), and how you verified or adapted their output.
If you did not use any AI tools, simply state so.