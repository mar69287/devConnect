import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar'
import HomePage from '../HomePage';
import { Navigate } from 'react-router-dom';
import NonUserNavBar from '../../components/NavBar/NonUserNavBar';
import LoginPage from '../LoginPage'

export default function App() {
  const [ user, setUser ] = useState(getUser())

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
        :
        // <AuthPage setUser={setUser} />
        <>
          {/* <NonUserNavBar /> */}
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login " element={<LoginPage />} />
              <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </>
        
      }
    </main>
  );
}


