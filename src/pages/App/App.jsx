import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import { getProfile } from '../../utilities/profiles-api'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/UserNavBar'
import HomePage from '../HomePage';
import { Navigate } from 'react-router-dom';
import NonUserNavBar from '../../components/NavBar/NonUserNavBar';
import LoginPage from '../LoginPage'
import SignUpPage from '../SignUpPage';
import ProfileCreatePage from '../ProfileCreatePage';
import { Box } from '@chakra-ui/react'
import FeedPage from '../FeedPage';
import EditPostPage from '../EditPostPage';
import NetworkPage from '../NetworkPage';
import ProfilePage from '../ProfilePage';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ profile, setProfile ] = useState(null)
  const [ followers, setFollowers ] = useState([])
  const [ following, setFollowing ] = useState([])
  const [ followersCount, setFollowersCount ] = useState(0)
  const [ followingCount, setFollowingCount ] = useState(0)
  
//   useEffect(() => {
//     async function fetchProfile() {
//         try {
//             const profileData = await getProfile();
//             setProfile(profileData);
//         } catch (error) {
//             console.error(error);
//         }
//     }
//         fetchProfile();
// }, [user]);

  return (
    <Box as='main' className="App" >
      <Box width={{ base: "100%", '2xl': "1400px" }} m={'0 auto'} pt={'90px'} minH={'100vh'}>
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} profile={profile} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage profile={profile} setProfile={setProfile} user={user} followers={followers} setFollowers={setFollowers} followersCount={followersCount} setFollowersCount={setFollowersCount} following={following} setFollowing={setFollowing} followingCount={followingCount} setFollowingCount={setFollowingCount}/>} />
            <Route path="/friends" element={<NetworkPage profile={profile} followers={followers} setFollowers={setFollowers} followersCount={followersCount} setFollowersCount={setFollowersCount} following={following} setFollowing={setFollowing} followingCount={followingCount} setFollowingCount={setFollowingCount}/>} />
            <Route path='/profile/create' element={<ProfileCreatePage setProfile={setProfile} user={user}/>} />
            <Route path='/profile/:userName' element={<ProfilePage profile={profile} setProfile={setProfile} user={user} following={following} setFollowing={setFollowing} setFollowingCount={setFollowingCount}/>} />
            <Route path='/post/edit/:postId' element={<EditPostPage />} />
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
    </Box>
  );
}


