import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useState } from 'react';

import MyNavbar from './components/MyNavbar';
import InstructionsPage from './components/pages/InstructionsPage';
import LoginPage from './components/pages/LoginPage';
import GamePage from './components/pages/GamePage';
import RankingPage from './components/pages/RankingPage';

function AppLayout() {
  return (
    <>
      <MyNavbar />

      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}

function NotFoundPage() { return <h1>Error 404 - Not Found</h1>; }

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<AppLayout />}>

            <Route path='/' element={<InstructionPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/game' element={<GamePage />} />
            <Route path='/scores' element={<RankingPage />} />
            <Route path='*' element={<NotFoundPage />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
