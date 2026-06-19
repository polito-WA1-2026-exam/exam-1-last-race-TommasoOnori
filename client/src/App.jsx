import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useState } from 'react';

import MyNavbar from './components/MyNavbar';
import InstructionsPage from './components/pages/InstructionsPage';
import LoginPage from './components/pages/LoginPage';
import GamePage from './components/pages/GamePage';
import RankingPage from './components/pages/RankingPage';

function AppLayout({ loggedIn, handleLodout }) {
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

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<AppLayout />}>

            <Route index element={<InstructionPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='game' element={<GamePage />} />
            <Route path='scores' element={<RankingPage />} />
            <Route path='*' element={<NotFoundPage />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
