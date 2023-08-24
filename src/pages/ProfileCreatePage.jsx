import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { createProfile } from '../utilities/profiles-api'
import { Stack, Box, Button, FormControl, FormLabel, Input, Text, VStack, Flex, Heading } from "@chakra-ui/react";
import axios from 'axios'

const ProfileCreatePage = ({ setProfile, user }) => {
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
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewProfile({ ...newProfile, picture: selectedFile });
    setSelectedFileName(selectedFile.name); 
  };


  const handleNewProfile = async (evt) => {
    evt.preventDefault();

    if (newProfile.picture) {
      try {
        const formData = new FormData();
        formData.append('profilePicture', newProfile.picture);

        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('File uploaded:', response.data.filePath);
      } catch (error) {
        console.error('File upload error:', error);
      }
    }

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
        picture: newProfile.picture ? newProfile.picture.name : null, 
      });

      setProfile(profile);
      navigate('/feed');
    } catch (err) {
      console.log(err);
    }
  };


  return (
      <Box width={{ base: "100%", '2xl': "1400px" }} m={'0 auto'} pt={'90px'} minH={'100vh'} display={'flex'}  justifyContent={"center"} alignItems={"center"}>
        <Box m={4} w={['100%', '75%']}  p={4} gap={5} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
          <Heading textAlign={'center'} color={'whiteAlpha.700'}>Profile Info</Heading>
          <Stack spacing={4}  direction={['column', 'row']}  alignItems={"center"}>
              <VStack w={['100%', '50%']} color={'whiteAlpha.700'}>
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
                  <Input value={newProfile.bio} onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })} />
                </FormControl>
              </VStack>
              <VStack w={['100%', '50%']} color={'whiteAlpha.700'}>
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
                  <FormLabel>Profile Picture</FormLabel>
                  <Input
                    display="none"
                    type="file"
                    id="profile-picture"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="profile-picture">
                    <Button
                      as="span"
                      borderRadius="md"
                      colorScheme='whiteAlpha'
                      cursor="pointer"
                    >
                      Choose File
                    </Button>
                  </label>
                  {selectedFileName && <Text marginLeft={3} display={'inline-block'}>{selectedFileName}</Text>}
                </FormControl>
              </VStack>
          </Stack>
          <Button colorScheme="pink" _hover={{ bgGradient:'linear(to-l,#FF0080, #7928CA)'}} onClick={handleNewProfile}>Save</Button>
        </Box>
      </Box>
  )
}

export default ProfileCreatePage