import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import { getProfile } from '../../utilities/profiles-api'
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/UserNavBar'
import HomePage from '../HomePage';
import { Navigate } from 'react-router-dom';
import NonUserNavBar from '../../components/NavBar/NonUserNavBar';
import LoginPage from '../LoginPage'
import SignUpPage from '../SignUpPage';
import ProfileCreatePage from '../ProfileCreatePage';
import { Box } from '@chakra-ui/react'
import FeedPage from '../FeedPage';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ profile, setProfile ] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
        try {
            const profileData = await getProfile();
            setProfile(profileData);
        } catch (error) {
            console.error(error);
        }
    }

    if (user) {
        fetchProfile();
    }
}, [user]);

  return (
    <Box className="App" >
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path='/profile/create' element={<ProfileCreatePage setProfile={setProfile} user={user}/>} />
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


