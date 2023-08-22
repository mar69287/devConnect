import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/UserNavBar'
import HomePage from '../HomePage';
import { Navigate } from 'react-router-dom';
import NonUserNavBar from '../../components/NavBar/NonUserNavBar';
import LoginPage from '../LoginPage'
import SignUpPage from '../SignUpPage';
import ProfileEditPage from '../ProfileCreatePage';
import { Box } from '@chakra-ui/react'

export default function App() {
  const [ user, setUser ] = useState(getUser())

  return (
    <Box className="App" >
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/profile/create' element={<ProfileEditPage user={user}/>} />
          </Routes>
        </>
        :
        // <AuthPage setUser={setUser} />
        <>
          {/* <NonUserNavBar /> */}
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage setUser={setUser}/>} />
              <Route path="/signup" element={<SignUpPage setUser={setUser}/>} />
              <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </>
        
      }
    </Box>
  );
}


