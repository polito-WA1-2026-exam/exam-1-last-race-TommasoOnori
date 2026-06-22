import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MyNavbar from './components/MyNavbar';
import InstructionsPage from './components/pages/InstructionsPage';
import LoginPage from './components/pages/LoginPage';
import GamePage from './components/pages/GamePage';
import RankingPage from './components/pages/RankingPage';
import API from './API'

function AppLayout({ loggedIn, user, handleLogout }) {
  return (
    <>
      <MyNavbar loggedIn={loggedIn} user={user} handleLogout={handleLogout} />

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await API.getCurrentUser();
        setLoggedIn(true);
        setUser(currentUser);
      } catch (err) {
        if (err.message !== "No active session.") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <h3>Loading Last Race...</h3>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AppLayout loggedIn={loggedIn} user={user} handleLogout={handleLogout} />}>

            <Route index element={<InstructionsPage loggedIn={loggedIn} />} />

            <Route path="login" element={
              user ? <Navigate to="/" /> : <LoginPage handleLogin={handleLogin} />
            } />

            <Route path="game" element={
              user ? <GamePage /> : <Navigate to="/login" />
            } />

            <Route path="scores" element={
              user ? <RankingPage /> : <Navigate to="/login" />
            } />
            <Route path='*' element={<NotFoundPage />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
