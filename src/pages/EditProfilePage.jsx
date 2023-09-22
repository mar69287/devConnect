import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {  updateUserProfile } from '../utilities/profiles-api'
import { FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Textarea, Button, Text, HStack, ModalFooter } from '@chakra-ui/react';
import { BsCardImage } from 'react-icons/bs'
import axios from 'axios'
import Dropzone from 'react-dropzone';

const EditProfilePage = ({ profile, setProfile }) => {
  const [updateProfile, setUpdateProfile] = useState({
    name: profile.name,
    userName: profile.userName,
    location: profile.location,
    bio: profile.bio,
    github: profile.github,
    linkedIn: profile.linkedIn,
    portfolio: profile.portfolio,
    picture: profile.picture,
  })
  const navigate = useNavigate()
  const [fileName, setFileName] = useState(profile.picture)

  const handleUpdateProfile = async (evt) => {
    evt.preventDefault();

    if (fileName !== profile.picture) {
        try {
          const formData = new FormData();
          formData.append('profilePicture', updateProfile.picture);
  
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
        if (updateProfile.picture !== profile.picture) {
            updateProfile.picture = fileName;
        } else {
            updateProfile.picture = profile.picture;
        }
      const updatedProfile = await updateUserProfile(profile._id, updateProfile);
      setProfile(updatedProfile);
      navigate(`/profile/${profile.userName}`)
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
        setUpdateProfile({
            ...updateProfile,
            picture: selectedFile,
        });
        setFileName(selectedFile.name);
    }
  };


  return (
    <Modal isOpen={true} size={"xl"}>
        <ModalOverlay />
        <ModalContent backgroundColor={'rgb(28, 30, 35)'}>
            <ModalHeader color="rgb(255, 255, 255)"> Edit Profile</ModalHeader>
            <ModalBody>
                <FormControl isRequired mt={2}>
                    <FormLabel color="rgb(255, 255, 255)">Name</FormLabel>
                    <Input 
                        borderRadius={100}
                        color={'whiteAlpha.800'}
                        fontSize={'sm'} 
                        _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                        defaultValue={profile.name}
                        backgroundColor={'blackAlpha.300'}
                        borderColor={'whiteAlpha.500'}
                        focusBorderColor='whiteAlpha.600'
                        onChange={(e) => setUpdateProfile({ ...updateProfile, name: e.target.value })}
                    />
                </FormControl>
                <FormControl isRequired mt={2}>
                    <FormLabel color="rgb(255, 255, 255)">userName</FormLabel>
                    <Input 
                        borderRadius={100}
                        color={'whiteAlpha.800'}
                        fontSize={'sm'} 
                        _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                        defaultValue={profile.userName}
                        backgroundColor={'blackAlpha.300'}
                        borderColor={'whiteAlpha.500'}
                        focusBorderColor='whiteAlpha.600'
                        onChange={(e) => setUpdateProfile({ ...updateProfile, userName: e.target.value })}
                    />
                </FormControl>
                <FormControl mt={2}>
                    <FormLabel color="rgb(255, 255, 255)">Bio</FormLabel>
                    <Textarea 
                        borderRadius={6}
                        color={'whiteAlpha.800'}
                        fontSize={'sm'} 
                        _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                        defaultValue={profile.bio}
                        backgroundColor={'blackAlpha.300'}
                        borderColor={'whiteAlpha.500'}
                        focusBorderColor='whiteAlpha.600'
                        onChange={(e) => setUpdateProfile({ ...updateProfile, bio: e.target.value })}
                    />
                </FormControl>
                <FormControl mt={2}>
                    <FormLabel color="rgb(255, 255, 255)">Github</FormLabel>
                    <Input 
                        borderRadius={100}
                        color={'whiteAlpha.800'}
                        fontSize={'sm'} 
                        _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                        defaultValue={profile.github}
                        backgroundColor={'blackAlpha.300'}
                        borderColor={'whiteAlpha.500'}
                        focusBorderColor='whiteAlpha.600'
                        onChange={(e) => setUpdateProfile({ ...updateProfile, github: e.target.value })}
                    />
                </FormControl>
                <FormControl mt={2}>
                    <FormLabel color="rgb(255, 255, 255)">Portfolio</FormLabel>
                    <Input 
                        borderRadius={100}
                        color={'whiteAlpha.800'}
                        fontSize={'sm'} 
                        _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                        defaultValue={profile.portfolio}
                        backgroundColor={'blackAlpha.300'}
                        borderColor={'whiteAlpha.500'}
                        focusBorderColor='whiteAlpha.600'
                        onChange={(e) => setUpdateProfile({ ...updateProfile, portfolio: e.target.value })}
                    />
                </FormControl>
                <FormControl mt={2}>
                    <FormLabel color="rgb(255, 255, 255)">LinkedIn</FormLabel>
                    <Input 
                        borderRadius={100}
                        color={'whiteAlpha.800'}
                        fontSize={'sm'} 
                        _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                        defaultValue={profile.linkedIn}
                        backgroundColor={'blackAlpha.300'}
                        borderColor={'whiteAlpha.500'}
                        focusBorderColor='whiteAlpha.600'
                        onChange={(e) => setUpdateProfile({ ...updateProfile, linkedIn: e.target.value })}
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
                            {fileName}
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
                                        as="span"
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
              <Button mr={3} colorScheme='blue' borderRadius={50} type="submit" onClick={() => navigate(-1)}>Return</Button>
              <Button colorScheme='pink' borderRadius={50} type="submit" onClick={handleUpdateProfile}>Save Changes</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default EditProfilePage