import { HStack, VStack, Image, Text, Heading, Box, Button, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader, useDisclosure, Menu, MenuButton, IconButton, MenuList, MenuItem, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input } from "@chakra-ui/react"
import { BsFillChatLeftDotsFill, BsThreeDots, BsTrash3Fill, BsFillPencilFill, BsFillPersonCheckFill, BsPlusLg } from 'react-icons/bs'
import { BiSolidLike } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { deletePost, addLike, deleteLike, getUserLikes, getPostLikes, addComment, getPostComments, deleteComment } from "../utilities/posts-api";
import { addFollowing, deleteFollowing } from '../utilities/profiles-api'

const PostCard = ({ posts, post, profile, setPosts, following, setFollowing, setFollowingCount}) => {
    const deleteDisclosure = useDisclosure();
    // const deleteCommentDisclosure = useDisclosure();
    const [postLikes, setPostLikes] = useState(post.likes)
    const [totalPostLikes, setTotalPostLikes] = useState(post.likes.length)
    const [isPostLikedByCurrentUser, setIsPostLikedByCurrentUser] = useState(post.likes.some((like) => like.profile._id === profile._id));
    const [totalPostComments, setTotalPostComments] = useState(post.comments.length)
    const [isFollowingPostAuthor, setIsFollowingPostAuthor] = useState(following.some((followedProfile) => followedProfile._id === post.profile._id));
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [commentInput, setCommentInput] = useState('');
    const [postComments, setPostComments] = useState(post.comments)
    const [showComments, setShowComments] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeletePost = () => {
        deleteDisclosure.onOpen();
    };

    const handleDeleteConfirm = async () => {
        try {
          await deletePost(post._id); 
          const deletedId = post._id
          setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedId));
          deleteDisclosure.onClose();
        } catch (error) {
          console.error("Error deleting post:", error);
        }
    };

    const handleAddLike = async (postId) => {
        try {
            const idData = {
                post: postId,
                profile: profile._id
            }
            const newLike = await addLike(postId, idData);
            newLike.profile = {
                picture: profile.picture,
                userName: profile.userName,
                _id: profile._id
            };
            setPostLikes((prevLikes) => [...prevLikes, newLike]);
            setTotalPostLikes((prevTotalLikes) => prevTotalLikes + 1);
            setIsPostLikedByCurrentUser(true);
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
          const likeIndexToDelete = postLikes.findIndex(like => like.profile._id === profile._id);
          setPostLikes(prevLikes => prevLikes.filter((_, index) => index !== likeIndexToDelete));
          setTotalPostLikes((prevTotalLikes) => prevTotalLikes - 1);
          setIsPostLikedByCurrentUser(false);
        } catch (error) {
          console.error("Error adding like:", error);
        }
    }

    const handleCommentInputChange = (e) => {
        setCommentInput(e.target.value);
    };

    const handleAddComment = async (postId) => {
        if (commentInput.trim() === '') {
          return;
        }
        try {
          const commentData = {
            content: commentInput,
            profile: profile._id
          }
          const newComment = await addComment(postId, commentData);
          newComment.profile = {
            picture: profile.picture,
            userName: profile.userName,
            _id: profile._id
          };
        //   const updatedPosts = posts.map((post) => {
        //     if (post._id === postId) {
        //       return {
        //         ...post,
        //         comments: [
        //           ...post.comments,
        //           {
        //             content: commentInput,
        //             profile: profile._id,
        //           },
        //         ],
        //       };
        //     }
        //     return post;
        //   });
          
        //   setPosts(updatedPosts);
          setPostComments((prevComments) => [...prevComments, newComment]);
          setCommentInput('')
          setTotalPostComments((prevTotalComments) => prevTotalComments + 1);
        } catch (error) {
          console.error("Error adding comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(post._id, commentId); 
            setPostComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== commentId)
            );
            setTotalPostComments((prevTotalComments) => prevTotalComments - 1);
          } catch (error) {
            console.error("Error deleting comment:", error);
          }
    };

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleAddFollowing = async (postProfileId) => {
        try {
            const newFollowing = await addFollowing(profile._id, postProfileId);
            setFollowing((prev) => [...prev, newFollowing]);
            setFollowingCount((prevTotal) => prevTotal + 1);
            setIsFollowingPostAuthor(true)
        } catch (error) {
            console.error("Error adding like:", error);
        }
    }
    
    const handleDeleteFollowing = async (postProfileId) => {
        try {
            await deleteFollowing(profile._id, postProfileId);
            setFollowing((prevFollowing) => prevFollowing.filter((profile) => profile._id !== postProfileId));
            setFollowingCount((prevTotal) => prevTotal - 1);
            setIsFollowingPostAuthor(false)
        } catch (error) {
            console.error("Error adding like:", error);
        }
    }


  return (
    <VStack position={"relative"} mb={4} gap={2} pt={3} pb={1} px={4} w={['100%']} bgGradient='linear(to-t, rgb(18,18,18), rgb(31,31,31))' border={'2px solid rgb(50,50,50)'} borderRadius={10}>
        <HStack justifyContent={'space-between'} w={'100%'}>
            <Link to={`/profile/${post.profile.userName}`}>
                <HStack>
                    <Image
                        borderRadius='full'
                        boxSize='40px'
                        src={post.profilePic? `${post.profilePic }` : 'https://i.imgur.com/uNL6B8O.png'}
                        alt='Dan Abramov'
                        border={'2px solid'}
                        borderColor={"whiteAlpha.600"}
                    />
                    <Heading  color="rgb(255, 255, 255)" size='sm'>{post.profile.userName}</Heading>
                </HStack>
            </Link>
            {profile._id === post.profile._id && (
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
                      <MenuItem icon={<BsFillPencilFill />}>
                            Edit Post
                      </MenuItem>
                    </Link>
                    <MenuItem icon={<BsTrash3Fill />} onClick={handleDeletePost}>Delete Post</MenuItem>
                  </MenuList>
                </Menu>
            )}
            {profile._id !== post.profile._id && (
                <Button
                    variant='ghost' 
                    color='rgb(204, 206, 209)'
                    size={"sm"}
                    leftIcon={isFollowingPostAuthor ? <BsFillPersonCheckFill /> : <BsPlusLg />}
                    onClick={() => {
                        if (isFollowingPostAuthor) {
                            handleDeleteFollowing(post.profile._id);
                        } else {
                            handleAddFollowing(post.profile._id);
                        }
                    }}
                    _hover={{
                        color: 'rgb(255, 255, 255)',
                        borderColor: 'rgb(255, 255, 255)',
                    }}
                >
                {isFollowingPostAuthor ? "Following" : "Follow"}
                </Button>
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
                    src={`${post.picture}`}
                    alt='Post Image'
                    objectFit='cover'
                />
            )}
            <HStack justifyContent={'space-between'} w={'100%'} mt={0}>
                {totalPostLikes > 0 && (
                    <HStack align="center"  _hover={{ cursor: "pointer" }} onClick={handleToggleModal}>
                        <BiSolidLike size={12} color={'rgb(213, 45, 129)'} />
                        <Text 
                        color={'rgb(204, 206, 209)'} 
                        fontSize="xs" ml={1} 
                        _hover={{ color: 'rgb(213, 45, 129)', transition: "color 0.2s" }}
                        >
                        {totalPostLikes}
                        </Text>
                    </HStack>
                )}
                {isModalOpen && (
                    <Modal size='md' isOpen={isModalOpen} onClose={handleToggleModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Likes</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {postLikes.map((like) => (
                                    <Box key={like._id}>
                                        <Link to={`/profile/${like.profile.userName}`}>
                                            <HStack mb={1}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='40px'
                                                    src={like.profile.picture ? `${like.profile.picture}` : 'https://i.imgur.com/uNL6B8O.png'}
                                                    alt='Dan Abramov'
                                                    border={'2px solid'}
                                                    borderColor={"whiteAlpha.600"}
                                                />
                                                <Heading color="black" size='sm'>{like.profile.userName}</Heading>
                                            </HStack>
                                        </Link>
                                        <Divider borderColor={"blackAlpha.600"} my={1}/>
                                    </Box>
                                ))}
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}
                {totalPostComments > 0 && (
                    <HStack align="center" _hover={{ cursor: "pointer" }} onClick={() => setShowComments(!showComments)}>
                        <Text 
                            color={'rgb(204, 206, 209)'} 
                            fontSize="xs" 
                            _hover={{ color: 'rgb(213, 45, 129)', transition: "color 0.2s" }}
                        >
                            {totalPostComments}
                        </Text>
                        {totalPostComments === 1 &&(
                            <Text 
                                color={'rgb(204, 206, 209)'} 
                                fontSize="xs" 
                                _hover={{ color: 'rgb(213, 45, 129)', transition: "color 0.2s" }}
                            >
                                comment
                            </Text>
                        )}
                        {totalPostComments > 1 &&(
                            <Text 
                                color={'rgb(204, 206, 209)'} 
                                fontSize="xs" 
                                _hover={{ color: 'rgb(213, 45, 129)', transition: "color 0.2s" }}
                            >
                                comments
                            </Text>
                        )}
                    </HStack>

                )}
            </HStack>
            <Divider borderColor={"#F8F8F8"} mt={2}/>
            <HStack justify='space-between' w={'100%'}>
            {isPostLikedByCurrentUser ? (
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
                    _hover={{ color: '#000', bg: 'rgba(255, 255, 255, 0.9)' }}
                    onClick={() => handleAddLike(post._id)}
                >
                    Like
                </Button>
            )}

                <Button 
                  color={'rgb(204, 206, 209)'} 
                  flex='1' variant='ghost' 
                  leftIcon={<BsFillChatLeftDotsFill />}
                  _hover={{ color: '#000', bg: 'rgba(255, 255, 255, 0.9)' }} 
                  onClick={() => setShowCommentInput(true)}
                >
                  Comment
                </Button>
            </HStack>
            {showCommentInput && (
                <HStack w={'100%'}>
                    <Input
                        borderRadius={100}
                        placeholder="Add a comment..."
                        color={'whiteAlpha.800'}
                        fontSize={'sm'}
                        _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                        backgroundColor={'blackAlpha.300'}
                        borderColor={'whiteAlpha.500'}
                        focusBorderColor='whiteAlpha.600'
                        onChange={handleCommentInputChange}
                        value={commentInput}                  
                    />
                    <Button colorScheme='pink' borderRadius={50} onClick={() => handleAddComment(post._id)}>Post</Button>
                </HStack>
            )}
            {showComments && (postComments.map((comment) => (
                <HStack mb={1} key={comment._id} w={'100%'} display={"flex"} alignItems={'flex-start'} justifyContent={'flex-start'}>
                    <Link to={`/profile/${comment.profile.userName}`}>
                        <Image
                            borderRadius='full'
                            boxSize='30px'
                            src={comment.profile.picture ? `${comment.profile.picture}` : 'https://i.imgur.com/uNL6B8O.png'}
                            alt='Dan Abramov'
                            border={'2px solid'}
                            borderColor={"whiteAlpha.600"}
                        />
                    </Link>
                    <VStack borderRadius={5} p={2} ml={2} flex={1} backgroundColor={'rgb(15, 17, 20)'} borderColor={'WhiteAlpha300'}>
                        <HStack justifyContent={'space-between'} w={'100%'}>
                            <HStack>
                                <Heading  color="rgb(255, 255, 255)" fontSize='.8rem'>{comment.profile.userName}</Heading>
                            </HStack>
                            {profile._id === comment.profile._id && (
                                <Menu>
                                <MenuButton 
                                    color={'rgb(204, 206, 209)'}
                                    variant='ghost'
                                    size={'sm'}
                                    as={IconButton}
                                    icon={<BsThreeDots />}
                                />
                                <MenuList>
                                    {/* <Link to={`/post/edit/${post._id}`}>
                                        <MenuItem icon={<BsFillPencilFill />}>
                                                Edit Comment
                                        </MenuItem>
                                    </Link> */}
                                    <MenuItem icon={<BsTrash3Fill />} onClick={() => handleDeleteComment(comment._id)}>Delete Comment</MenuItem>
                                </MenuList>
                                </Menu>
                            )}
                        </HStack>
                        <Text w={'100%'} fontSize="sm" color="whiteAlpha.800" textAlign={"left"}>
                            {comment.content}
                        </Text>
                    </VStack>
                </HStack>
            )))}
        </VStack>
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
    </VStack>
  )
}

export default PostCard