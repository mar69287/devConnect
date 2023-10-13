import { useState } from "react";
import { Input, InputGroup, Modal, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, ModalBody, ModalFooter, Button, Divider, Textarea, Box, Text } from "@chakra-ui/react";
import { createPost } from "../utilities/posts-api";
import { BsCardImage } from 'react-icons/bs'
import axios from 'axios'
import Dropzone from 'react-dropzone';

const PostInput = ({user, profile, setPosts}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(""); 
  const [postData, setPostData] = useState({
    type: '',
    profile: '',
    profilePic: '',
    title: '',
    content: '',
    picture: '',
    username: ''
  });

  const handleFileChange = (selectedFile) => {
    setPostData({ ...postData, picture: selectedFile });
    setSelectedFileName(selectedFile ? selectedFile.name : ""); 
  };

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleButtonSelect = (buttonType) => {
    setSelectedButton(buttonType);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedButton(null); 
  };

  const handleChange = (evt) => {
    setPostData({
      ...postData,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (postData.picture) {
      const formData = new FormData();
      formData.append('image', postData.picture);
      formData.append('type', selectedButton)
      formData.append('profile', profile._id)
      formData.append('title', postData.title)
      formData.append('content', postData.content)
      const post = await axios.post("/api/posts/create", formData, { headers: {'Content-Type': 'multipart/form-data'}})
      setPosts(prevPosts => [post.data, ...prevPosts]);
      setIsModalOpen(false);
      setSelectedButton(null)
      setSelectedFileName('')
      setPostData({
        type: '',
        profile: '',
        title: '',
        content: '',
        picture: '',
        username: ''  
      });
    } else {
      const post = await createPost({
        type: selectedButton,
        profile: profile._id,
        profilePic: profile.picture,
        title: postData.title,
        content: postData.content,
        picture: postData.picture ? postData.picture.name : null,
        username: profile.userName
      });
      
      setPosts(prevPosts => [post, ...prevPosts]);
      setIsModalOpen(false);
      setSelectedButton(null)
      setSelectedFileName('')
      setPostData({
      type: '',
      profile: '',
      title: '',
      content: '',
      picture: '',
      username: ''
    });
    }
  };

  return (
    <form style={{ width: '100%' }}>
      <InputGroup>
        <Input  
          onClick={handleInputClick}
          borderRadius={100}
          placeholder="What's on your mind..."
          color={'whiteAlpha.800'}
          fontSize={'sm'}
          _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
          backgroundColor={'blackAlpha.300'}
          borderColor={'whiteAlpha.500'}
          focusBorderColor='whiteAlpha.600'
        />
      </InputGroup>
      <Modal isOpen={isModalOpen} onClose={closeModal} size={"full"} >
        <ModalOverlay  />
        <ModalContent backgroundColor={'rgb(28, 30, 35)'}>
          <ModalHeader color="rgb(255, 255, 255)">What type of post is this?</ModalHeader>
          <ModalCloseButton color="rgb(255, 255, 255)" />
          <ModalBody>
            <Button
              colorScheme="pink"
              borderRadius={50}
              // mb={2}
              mr={5}
              onClick={() => handleButtonSelect("experience")}
            >
              Experience
            </Button>
            <Button
              colorScheme="purple"
              borderRadius={50}
              onClick={() => handleButtonSelect("project")}
            >
              Project Collaboration
            </Button>
            {selectedButton === "experience" && (
              <Textarea  
                borderRadius={10}
                placeholder="What experience do you want to talk about?"
                color={'whiteAlpha.800'}
                fontSize={'sm'}
                _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                backgroundColor={'blackAlpha.300'}
                borderColor={'whiteAlpha.500'}
                focusBorderColor='whiteAlpha.600'
                mt={5}
                name="content"
                value={postData.name}
                onChange={handleChange}
              />
            )}
            {selectedButton === "project" && (
              <>
                <Input  
                  borderRadius={100}
                  placeholder="Project Idea"
                  color={'whiteAlpha.800'}
                  fontSize={'sm'}
                  _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                  backgroundColor={'blackAlpha.300'}
                  borderColor={'whiteAlpha.500'}
                  focusBorderColor='whiteAlpha.600'
                  mt={5}
                  name="title"
                  value={postData.title}
                  onChange={handleChange}
                />
                <Textarea  
                  borderRadius={10}
                  placeholder="Project explanation and how many people you are looking for."
                  color={'whiteAlpha.800'}
                  fontSize={'sm'}
                  _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                  backgroundColor={'blackAlpha.300'}
                  borderColor={'whiteAlpha.500'}
                  focusBorderColor='whiteAlpha.600'
                  mt={5}
                  name="content"
                  value={postData.name}
                  onChange={handleChange}
                />
              </>
            )}
          </ModalBody>
          <Divider borderColor={"whiteAlpha.300"} />
          <ModalFooter display={'Flex'} justifyContent={"space-between"}> 
            <Box>
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
                      variant={"ghost"}
                      as="span" 
                    >
                      Photo
                    </Button>
                  </div>
                )}
              </Dropzone>
                {selectedFileName && <Text color={'whiteAlpha.800'} marginLeft={3} display={'inline-block'}>{selectedFileName}</Text>}
            </Box>
            <Button colorScheme='pink' borderRadius={50} type="submit" onClick={handleSubmit}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
};

export default PostInput;
