import { useState } from "react";
import { Input, InputGroup, Modal, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, ModalBody, ModalFooter, Button, Divider, Textarea, FormControl, FormLabel } from "@chakra-ui/react";
import { createPost } from "../utilities/posts-api";

const PostInput = ({user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null); 
  const [postData, setPostData] = useState({
    type: '',
    author: '',
    title: '',
    content: '',
    picture: ''
  });

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
    try {
      const post = await createPost({
        type: selectedButton,
        author: user._id,
        title: postData.title,
        content: postData.content,
        picture: ''
      });
      setIsModalOpen(false);
      setSelectedButton(null)
      setPostData({
      type: '',
      author: '',
      title: '',
      content: '',
      picture: ''
    });
    } catch {
      setPostData({ ...postData, error: 'Post Failed - Try Again' });
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
          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button> */}
            <Button colorScheme='pink' borderRadius={50} type="submit" onClick={handleSubmit}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
};

export default PostInput;
