import { HStack, VStack, Image, Text, Heading, Box, Button, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader, useDisclosure, Menu, MenuButton, IconButton, MenuList, MenuItem, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { BiSolidLike } from 'react-icons/bi'
import { BsFillChatLeftDotsFill, BsThreeDots, BsTrash3Fill, BsFillPencilFill } from 'react-icons/bs'
import { deletePost, addLike, deleteLike, getLikes } from "../utilities/posts-api";
import { Link } from "react-router-dom";

const Posts = ({ posts, profile, setPosts }) => {
  const deleteDisclosure = useDisclosure();
  const likeModalDisclosure = useDisclosure();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState(null);

  useEffect(() => {
    async function fetchLikedPosts() {
      try {
        const likes = await getLikes(profile._id)
        setLikedPosts(likes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLikedPosts()
  }, [profile._id])

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
      const likedPost = posts.find((post) => post._id === postId);
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, likedPost]);
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
      const updatedLikedPosts = likedPosts.filter((likedPost) => likedPost._id !== postId);
      setLikedPosts(updatedLikedPosts);
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

  const handleOpenLikeModal = () => {
    likeModalDisclosure.onOpen();
  };

  const handleCloseLikeModal = () => {
    likeModalDisclosure.onClose();
  };

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
                <HStack align="center" mt={0}  _hover={{ cursor: "pointer" }}>
                  <BiSolidLike size={12} color={'rgb(213, 45, 129)'} />
                  <Text 
                    color={'rgb(204, 206, 209)'} 
                    fontSize="xs" ml={1} 
                    _hover={{ color: 'rgb(213, 45, 129)', transition: "color 0.2s" }}
                  >
                    {post.likes.length}
                  </Text>
                </HStack>
              )}
              <Modal isOpen={likeModalDisclosure.isOpen} onClose={handleCloseLikeModal} size='md'>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Likes</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {post.likes.map((like) => (
                    <HStack key={like._id}>
                      <Image
                        borderRadius='full'
                        boxSize='40px'
                        src={like.profile.picture ? `/assets/${like.profile.picture}` : 'https://bit.ly/dan-abramov'}
                        alt='Dan Abramov'
                        border={'2px solid'}
                        borderColor={"whiteAlpha.600"}
                    />
                      <Heading color="black" size='sm'>{like.profile.userName}</Heading>
                    </HStack>
                    ))}
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" onClick={handleCloseLikeModal}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Divider borderColor={"whiteAlpha.300"} mt={2}/>
              <HStack justify='space-between' w={'100%'}>
                {/* <Button
                 variant='ghost' 
                 color={clicked ? 'rgb(213, 45, 129)' : 'rgb(204, 206, 209)'}
                 leftIcon={<BiSolidLike />}
                 flex={1} 
                 onClick={() =>
                  likedPosts && likedPosts.some((likedPost) => likedPost._id === post._id)
                    ? handleDeleteLike(post._id)
                    : handleLike(post._id)
                 }
                >
                  Like
                </Button> */}
                {likedPosts && likedPosts.some((likedPost) => likedPost._id === post._id) ? (
                    <Button
                      variant='ghost' 
                      color='rgb(213, 45, 129)'
                      leftIcon={<BiSolidLike />}
                      flex={1} 
                      onClick={() => handleDeleteLike(post._id)}
                    >
                     Like
                    </Button>
                  ) : (
                    <Button
                      variant='ghost' 
                      color='rgb(204, 206, 209)'
                      leftIcon={<BiSolidLike />}
                      flex={1} 
                      onClick={() => handleLike(post._id)}
                    >
                      Like
                    </Button>
                  )}
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