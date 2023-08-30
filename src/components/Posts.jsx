import { HStack, VStack, Image, Text, Heading, Box, Button } from "@chakra-ui/react"
import { BiSolidLike } from 'react-icons/bi'
import { BsFillChatLeftDotsFill } from 'react-icons/bs'

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map((post) =>(
        <VStack key={post._id} gap={2} py={3} px={4} w={['100%']} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}>
            <HStack justifyContent={'flex-start'} w={'100%'}>
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
    </>
  )
}

export default Posts