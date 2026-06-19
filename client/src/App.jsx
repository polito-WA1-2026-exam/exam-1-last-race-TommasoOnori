import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';

import MyNavbar from './components/MyNavbar';
import InstructionsPage from './components/pages/InstructionsPage';
import LoginPage from './components/pages/LoginPage';
import GamePage from './components/pages/GamePage';
import RankingPage from './components/pages/RankingPage';
import API from './API'

function AppLayout({ loggedIn, handleLogout }) {
  return (
    <>
      <MyNavbar loggedIn={loggedIn} handleLogout={handleLogout} />

      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}

function NotFoundPage() { return <h1>Error 404 - Not Found</h1>; }

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUser(user);
    } catch (err) {
      throw err;
    }
  }

  const handleLogout = async () => {
    try {
      await API.logOut();
      setLoggedIn(false);
      setUser(null);
    } catch (err) {
      throw err;
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AppLayout loggedIn={loggedIn} handleLogout={handleLogout} />}>

            <Route index element={<InstructionsPage />} />

            <Route path="login" element={
              user ? <Navigate to="/" /> : <LoginPage handleLogin={handleLogin} />
            } />

            <Route path="game" element={
              user ? <GamePage /> : <Navigate to="/login" />
            } />

            <Route path="scores" element={
              user ? <RankingPage /> : <Navigate to="/login" />
            } />
            <Route path='*' element={
              user ? <NotFoundPage /> : <Navigate to="/login" />
            } />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
