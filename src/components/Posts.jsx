import { HStack, VStack, Image, Text, Heading, Box, Button, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader, useDisclosure, Menu, MenuButton, IconButton, MenuList, MenuItem, Divider } from "@chakra-ui/react"
import { useState } from 'react';
import { BiSolidLike } from 'react-icons/bi'
import { BsFillChatLeftDotsFill, BsThreeDots, BsTrash3Fill, BsFillPencilFill } from 'react-icons/bs'
import { deletePost, addLike, deleteLike } from "../utilities/posts-api";
import { Link } from "react-router-dom";

const Posts = ({ posts, profile, setPosts }) => {
  const deleteDisclosure = useDisclosure(); 
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    deleteDisclosure.onOpen();
  };

  const handleDeleteConfirm = async () => {
      try {
        await deletePost(selectedPostId); 
        setSelectedPostId(null);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== selectedPostId));
        deleteDisclosure.onClose();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
  };

  const handleLike = async (postId) => {
    try {
      const idData = {
        post: postId,
        profile: profile._id
      }
      await addLike(postId, idData);
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            likes: [...post.likes, { profile: profile._id }],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error adding like:", error);
    }

  }

  const handleDeleteLike = async (postId) => {
    try {
      const idData = {
        post: postId,
        profile: profile._id
      }
      await deleteLike(postId, idData);
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            likes: post.likes.filter((like) => like.profile !== profile._id),
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error adding like:", error);
    }

  }


  return (
    <>
      {posts.map((post) =>(
        <VStack position={"relative"} key={post._id} gap={2} pt={3} pb={1} px={4} w={['100%']} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <HStack>
                <Image
                    borderRadius='full'
                    boxSize='40px'
                    src={post.profilePic ? `/assets/${post.profilePic}` : 'https://bit.ly/dan-abramov'}
                    alt='Dan Abramov'
                    border={'2px solid'}
                    borderColor={"whiteAlpha.600"}
                />
                <Heading  color="rgb(255, 255, 255)" size='sm'>{post.username}</Heading>
              </HStack>
              {profile._id === post.profile && (
                <Menu>
                  <MenuButton 
                    color={'rgb(204, 206, 209)'}
                    variant='ghost'
                    size={'sm'}
                    as={IconButton}
                    icon={<BsThreeDots />}
                  />
                  <MenuList>
                    <Link to={`/post/edit/${post._id}`}>
                      <MenuItem icon={<BsFillPencilFill />} 
                      >
                            Edit Post
                      </MenuItem>
                    </Link>
                    <MenuItem icon={<BsTrash3Fill />} onClick={() => handleDeleteClick(post._id)}>Delete Post</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </HStack>
            <VStack w={['100%']} alignItems={'flex-start'}>
              {post.type === "project" && (
                <Box w={['100%']}>
                  <Heading color="whiteAlpha.900" size='xs' display={"inline-block"} mr={1}>Idea:</Heading>
                  <Text color="whiteAlpha.800" fontSize="sm" display={"inline-block"}>{post.title}</Text>
                </Box>
              )}
              <Text textAlign={'left'} color="whiteAlpha.800" fontSize='sm'>{post.content}</Text>
              {post.picture && (
                <Image
                  src={`/assets/${post.picture}`}
                  alt='Post Image'
                  objectFit='cover'
                />
              )}
              {post.likes.length > 0 && (
                <HStack align="center" mt={0}>
                  <BiSolidLike size={12} color={'rgb(213, 45, 129)'} />
                  <Text color={'rgb(204, 206, 209)'} fontSize="xs" ml={1}>
                    {post.likes.length}
                  </Text>
                </HStack>
              )}
              <Divider borderColor={"whiteAlpha.300"} mt={2}/>
              <HStack justify='space-between' w={'100%'}>
                <Button
                 color={post.likes.some((like) => like.profile === profile._id) ? 'rgb(213, 45, 129)' : 'rgb(204, 206, 209)'} 
                 flex='1' 
                 variant='ghost' 
                 leftIcon={<BiSolidLike />} 
                 onClick={() =>
                  post.likes.some((like) => like.profile === profile._id)
                    ? handleDeleteLike(post._id)
                    : handleLike(post._id)
                }>
                  Like
                </Button>
                <Button color={'rgb(204, 206, 209)'} flex='1' variant='ghost' leftIcon={<BsFillChatLeftDotsFill />}>
                  Comment
                </Button>
              </HStack>
            </VStack>
        </VStack>
      ))}
      <AlertDialog isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} size='md'>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={deleteDisclosure.onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default Posts