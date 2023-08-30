import { HStack, VStack, Image, Text, Heading, Box, Button, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogCloseButton, AlertDialogOverlay, AlertDialogHeader, useDisclosure } from "@chakra-ui/react"
import { useState } from 'react';
import { BiSolidLike } from 'react-icons/bi'
import { BsFillChatLeftDotsFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

const Posts = ({ posts, profile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleDeleteClick = (postId) => {
    console.log(postId)
    setSelectedPostId(postId);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    setSelectedPostId(null);
    onClose();
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
                <Button size={'xs'} color={'rgb(204, 206, 209)'} variant='ghost' onClick={() => handleDeleteClick(post._id)}>
                  X
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
                  src={`/assets/${post.picture}`}
                  alt='Post Image'
                  objectFit='cover'
                />
              )}
              <HStack justify='space-between' w={'100%'}>
                <Button color={'rgb(204, 206, 209)'} flex='1' variant='ghost' leftIcon={<BiSolidLike />}>
                  Like
                </Button>
                <Button color={'rgb(204, 206, 209)'} flex='1' variant='ghost' leftIcon={<BsFillChatLeftDotsFill />}>
                  Comment
                </Button>
              </HStack>
            </VStack>
        </VStack>
      ))}
      <AlertDialog isOpen={isOpen} onClose={onClose} size='md'>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
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