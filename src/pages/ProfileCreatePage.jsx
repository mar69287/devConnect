import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { createProfile } from '../utilities/profiles-api'
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";

const ProfileEditPage = ({ user }) => {
  const [newProfile, setNewProfile] = useState({
    name: user.name,
    email: user.email,
    userName: '',
    location: '',
    bio: '',
    github: '',
    linkedIn: '',
    portfolio: '',
    picture: '',
  })
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewProfile({ ...newProfile, picture: selectedFile.name });
  };

  const handleNewProfile = async (evt) => {
    evt.preventDefault();
    try { 
        const profile = await createProfile({
            user: user._id,
            name: newProfile.name,
            email: user.email,
            userName: newProfile.userName,
            location: newProfile.location,
            bio: newProfile.bio,
            github: newProfile.github,
            linkedIn: newProfile.linkedIn,
            portfolio: newProfile.portfolio,
            picture: newProfile.picture,
        })
        navigate('/')
    } catch (err) {
        console.log(err)
    }

  }

  return (
    <VStack spacing={4} align="stretch" p={4} mt={'70px'}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={newProfile.name} onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input value={newProfile.userName} onChange={(e) => setNewProfile({ ...newProfile, userName: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input value={newProfile.location} onChange={(e) => setNewProfile({ ...newProfile, location: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Bio</FormLabel>
        <Textarea value={newProfile.bio} onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>GitHub</FormLabel>
        <Input value={newProfile.github} onChange={(e) => setNewProfile({ ...newProfile, github: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>LinkedIn</FormLabel>
        <Input value={newProfile.linkedIn} onChange={(e) => setNewProfile({ ...newProfile, linkedIn: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Portfolio</FormLabel>
        <Input value={newProfile.Portfolio} onChange={(e) => setNewProfile({ ...newProfile, portfolio: e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Picture</FormLabel>
        <Input type="file" onChange={handleFileChange} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleNewProfile}>Save</Button>
    </VStack>
  )
}

export default ProfileEditPage