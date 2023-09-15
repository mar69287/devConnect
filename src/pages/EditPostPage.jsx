import {  Input, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Divider, HStack } from "@chakra-ui/react"
import { BsCardImage } from 'react-icons/bs'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPost, updatePost } from '../utilities/posts-api';
import axios from 'axios'

const EditPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('')
  const [editedPost, setEditedPost] = useState({
    title: '',
    picture: '',
    content: '',
  });

  useEffect(() => {
    async function getPostById() {
        const post = await getPost(postId);
        setPost(post);
        setEditedPost({
            title: post.title,
            picture: post.picture,
            content: post.content,
        });
        setFileName(post.picture)
    }
    getPostById();
}, []);

const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setEditedPost({
        ...editedPost,
        picture: selectedFile,
      });
      setFileName(selectedFile.name)
    }
};

const handleEditConfirm = async (evt) => {
    evt.preventDefault();
    if (editedPost.picture) {
      try {
        const formData = new FormData();
        formData.append('profilePicture', editedPost.picture);

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
      const updatedPost = {
        title: editedPost.title || post.title,
        content: editedPost.content || post.content,
      }
      if (editedPost.picture) {
        updatedPost.picture = editedPost.picture.name;
      } else {
        updatedPost.picture = post.picture;
      }
      await updatePost(post._id, updatedPost);
      navigate(-1);
    } catch {
      console.error("Error updating post:");
    }
  };

  return (
    <Modal isOpen={true} size={"xl"}>
        <ModalOverlay />
        <ModalContent backgroundColor={'rgb(28, 30, 35)'}>
          <ModalHeader color="rgb(255, 255, 255)">Edit Post</ModalHeader>
          <ModalBody>
            {post && (
              <>
                {post.type === "project" && (
                  <Input
                    borderRadius={100}
                    color={'whiteAlpha.800'}
                    fontSize={'sm'} 
                    _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                    defaultValue={post.title}  
                    backgroundColor={'blackAlpha.300'}
                    borderColor={'whiteAlpha.500'}
                    focusBorderColor='whiteAlpha.600'
                    name="title"
                    onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                  />
                )}
                <Textarea 
                  borderRadius={10}
                  defaultValue={post.content}
                  color={'whiteAlpha.800'}
                  fontSize={'sm'}
                  _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                  backgroundColor={'blackAlpha.300'}
                  borderColor={'whiteAlpha.500'}
                  focusBorderColor='whiteAlpha.600'
                  mt={5}
                  name="content"
                  onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                />
              </>
            )}
            <HStack>
              <Input
                display="none"
                type="file"
                id="post-picture"
                onChange={handleFileChange}
              />
              <label htmlFor="post-picture">
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
              </label>
              {post && (
                <Text color={'whiteAlpha.800'} marginLeft={3} display={'inline-block'}>{fileName}</Text>
              )}
            </HStack>
          </ModalBody>
          <Divider borderColor={"whiteAlpha.300"}/>
          <ModalFooter>
            <HStack>
              <Button colorScheme='blue' borderRadius={50} type="submit" onClick={() => navigate(-1)}>Return</Button>
              <Button colorScheme='pink' borderRadius={50} type="submit" onClick={handleEditConfirm}>Save Changes</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default EditPostPage