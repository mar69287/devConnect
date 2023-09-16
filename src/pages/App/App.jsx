import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import NavBar from '../../components/NavBar/UserNavBar'
import HomePage from '../HomePage';
import { Navigate } from 'react-router-dom';
import LoginPage from '../LoginPage'
import SignUpPage from '../SignUpPage';
import ProfileCreatePage from '../ProfileCreatePage';
import { Box } from '@chakra-ui/react'
import FeedPage from '../FeedPage';
import EditPostPage from '../EditPostPage';
import NetworkPage from '../NetworkPage';
import ProfilePage from '../ProfilePage';
import EditProfilePage from '../EditProfilePage';
import MessagesPage from '../MessagesPage';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ profile, setProfile ] = useState(null)
  const [ followers, setFollowers ] = useState([])
  const [ following, setFollowing ] = useState([])
  const [ followersCount, setFollowersCount ] = useState(0)
  const [ followingCount, setFollowingCount ] = useState(0)
  const [ chatUser, setChatUser ] = useState(undefined)
  const navigate = useNavigate();

useEffect(() => {
  const lastVisitedPage = localStorage.getItem('lastVisitedPage');

  if (lastVisitedPage) {
    navigate(lastVisitedPage);
  }
}, []);

  return (
    <Box as='main' className="App" >
      <Box width={{ base: "100%", '2xl': "1400px" }} pb={5} m={'0 auto'} pt={'90px'} minH={'100vh'} position={'relative'}>
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} profile={profile} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage setChatUser={setChatUser} profile={profile} setProfile={setProfile} user={user} followers={followers} setFollowers={setFollowers} followersCount={followersCount} setFollowersCount={setFollowersCount} following={following} setFollowing={setFollowing} followingCount={followingCount} setFollowingCount={setFollowingCount}/>} />
            <Route path="/friends" element={<NetworkPage profile={profile} followers={followers} setFollowers={setFollowers} followersCount={followersCount} setFollowersCount={setFollowersCount} following={following} setFollowing={setFollowing} followingCount={followingCount} setFollowingCount={setFollowingCount}/>} />
            <Route path='/profile/create' element={<ProfileCreatePage setProfile={setProfile} user={user}/>} />
            <Route path='/profile/:userName/edit' element={<EditProfilePage setProfile={setProfile} profile={profile}/>} />
            <Route path='/profile/:userName' element={<ProfilePage profile={profile} setProfile={setProfile} user={user} following={following} setFollowing={setFollowing} setFollowingCount={setFollowingCount}/>} />
            <Route path='/post/edit/:postId' element={<EditPostPage />} />
            <Route path='/messaging' element={<MessagesPage chatUser={chatUser} />} />
            <Route path="*" element={<Navigate replace to="/feed" />} />
          </Routes>
        </>
        :
        <>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage setUser={setUser}/>} />
              <Route path="/signup" element={<SignUpPage setUser={setUser}/>} />
              <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </>
      }
      </Box>
    </Box>
  );
}


