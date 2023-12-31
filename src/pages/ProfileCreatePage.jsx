import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { createProfile } from '../utilities/profiles-api'
import { Button, FormControl, FormLabel, Input, Text, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalFooter, } from "@chakra-ui/react";
import axios from 'axios'
import { BsCardImage } from 'react-icons/bs'
import Dropzone from 'react-dropzone';

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

  const handleFileChange = (selectedFile) => {
    setNewProfile({ ...newProfile, picture: selectedFile });
    setSelectedFileName(selectedFile ? selectedFile.name : "");
};


  const handleNewProfile = async (evt) => {
    evt.preventDefault();

    if (newProfile.picture) {
      const formData = new FormData();
      formData.append('image', newProfile.picture);
      formData.append('user', user._id);
      formData.append('name', newProfile.name);
      formData.append('email', user.email);
      formData.append('userName', newProfile.userName);
      formData.append('location', newProfile.location);
      formData.append('bio', newProfile.bio);
      formData.append('github', newProfile.github);
      formData.append('linkedIn', newProfile.linkedIn);
      formData.append('portfolio', newProfile.portfolio);
      const profile = await axios.post("/api/profiles/create", formData, { headers: {'Content-Type': 'multipart/form-data'}})
      setProfile(profile.data)
      navigate('/feed');
    } else {
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
            picture: null, 
          });
    
          setProfile(profile);
          navigate('/feed');
    }

    // try {
    //   const profile = await createProfile({
    //     user: user._id,
    //     name: newProfile.name,
    //     email: user.email,
    //     userName: newProfile.userName,
    //     location: newProfile.location,
    //     bio: newProfile.bio,
    //     github: newProfile.github,
    //     linkedIn: newProfile.linkedIn,
    //     portfolio: newProfile.portfolio,
    //     picture: newProfile.picture ? newProfile.picture.name : null, 
    //   });

      // setProfile(profile);
      // navigate('/feed');
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
      <Modal isOpen={true} size={"xl"}>
        <ModalOverlay />
        <ModalContent backgroundColor={'rgb(28, 30, 35)'}>
          <ModalHeader color="rgb(255, 255, 255)">Profile</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
                <FormLabel color="rgb(255, 255, 255)">Name</FormLabel>
                <Input 
                  value={newProfile.name} 
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })} 
                  borderRadius={100}
                  color={'whiteAlpha.800'}
                  fontSize={'sm'} 
                  _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                  backgroundColor={'blackAlpha.300'}
                  borderColor={'whiteAlpha.500'}
                  focusBorderColor='whiteAlpha.600'
                />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel color="rgb(255, 255, 255)">Username</FormLabel>
              <Input 
                value={newProfile.userName} 
                onChange={(e) => setNewProfile({ ...newProfile, userName: e.target.value })} 
                borderRadius={100}
                color={'whiteAlpha.800'}
                fontSize={'sm'} 
                _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                backgroundColor={'blackAlpha.300'}
                borderColor={'whiteAlpha.500'}
                focusBorderColor='whiteAlpha.600'
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel color="rgb(255, 255, 255)">Bio</FormLabel>
              <Input 
                value={newProfile.bio} 
                onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })}
                borderRadius={100}
                color={'whiteAlpha.800'}
                fontSize={'sm'} 
                _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                backgroundColor={'blackAlpha.300'}
                borderColor={'whiteAlpha.500'}
                focusBorderColor='whiteAlpha.600'
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel color="rgb(255, 255, 255)">Location</FormLabel>
              <Input 
                value={newProfile.location} 
                onChange={(e) => setNewProfile({ ...newProfile, location: e.target.value })}
                borderRadius={100}
                color={'whiteAlpha.800'}
                fontSize={'sm'} 
                _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                backgroundColor={'blackAlpha.300'}
                borderColor={'whiteAlpha.500'}
                focusBorderColor='whiteAlpha.600'
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel color="rgb(255, 255, 255)">Portfolio</FormLabel>
              <Input 
                value={newProfile.portfolio} 
                onChange={(e) => setNewProfile({ ...newProfile, portfolio: e.target.value })}
                borderRadius={100}
                color={'whiteAlpha.800'}
                fontSize={'sm'} 
                _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                backgroundColor={'blackAlpha.300'}
                borderColor={'whiteAlpha.500'}
                focusBorderColor='whiteAlpha.600'
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel color="rgb(255, 255, 255)">Github</FormLabel>
              <Input 
                value={newProfile.github} 
                onChange={(e) => setNewProfile({ ...newProfile, github: e.target.value })}
                borderRadius={100}
                color={'whiteAlpha.800'}
                fontSize={'sm'} 
                _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                backgroundColor={'blackAlpha.300'}
                borderColor={'whiteAlpha.500'}
                focusBorderColor='whiteAlpha.600'
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel color="rgb(255, 255, 255)">LinkedIn</FormLabel>
              <Input 
                value={newProfile.linkedIn} 
                onChange={(e) => setNewProfile({ ...newProfile, linkedIn: e.target.value })}
                borderRadius={100}
                color={'whiteAlpha.800'}
                fontSize={'sm'} 
                _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                backgroundColor={'blackAlpha.300'}
                borderColor={'whiteAlpha.500'}
                focusBorderColor='whiteAlpha.600'
              />
            </FormControl>
            <FormControl mt={2}>
                    <FormLabel mb={0} color="rgb(255, 255, 255)">Profile Picture</FormLabel>
                    <HStack justifyContent={'space-between'}>
                        <Text color={'whiteAlpha.800'} marginLeft={0} display={'inline-block'}
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',   
                                textOverflow: 'ellipsis', 
                                maxWidth: '150px',    
                            }}
                        >
                            {selectedFileName}
                        </Text>
                        <Dropzone
                            maxFiles={1}
                            onDrop={(acceptedFiles) => {
                              const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                              if (acceptedFiles.length === 1 && imageTypes.includes(acceptedFiles[0].type)) {
                                  handleFileChange(acceptedFiles[0]);
                              } else {
                                  console.error('Invalid file type. Please upload a JPEG, JPG, or PNG image.');
                              }
                          }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} style={{ cursor: 'pointer' }}>
                                    <input {...getInputProps()} />
                                    <Button
                                        h={10}
                                        fontSize={'sm'}
                                        leftIcon={<BsCardImage />}
                                        colorScheme='whiteAlpha'
                                        variant="ghost"
                                    >
                                        Photo
                                    </Button>
                                </div>
                            )}
                        </Dropzone>
                    </HStack>
                </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='pink' borderRadius={50} type="submit" onClick={handleNewProfile}>Save</Button>
          </ModalFooter>

        </ModalContent>

      </Modal>
  )
}

export default ProfileCreatePage