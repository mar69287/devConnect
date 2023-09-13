import { Grid, GridItem, HStack, Heading, Image, Text, VStack, Spinner, Button } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import {  getProfile } from "../utilities/profiles-api"
import {  getProfilePosts } from "../utilities/posts-api"
import { useState, useEffect } from "react"
import { BsFillPersonCheckFill, BsPlusLg } from 'react-icons/bs'
import { BiPaperPlane } from 'react-icons/bi'

const ProfilePage = ({ profile }) => {
  const { userName } = useParams();
  const [profilePageAccount, setProfilePageAccount] = useState({})
  const [isFollowingPostAuthor, setIsFollowingPostAuthor] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchProfile() {
        try {
            const profileData = await getProfile(userName);
            setProfilePageAccount(profileData);
            const profilePosts = await getProfilePosts(profileData._id)
            setPosts(profilePosts)
            const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(sortedPosts);
            // setFollowers(profileData.followers)
            // setFollowersCount(profileData.followers.length)
            // setFollowing(profileData.following)
            // setFollowingCount(profileData.following.length)
        } catch (error) {
            console.error(error);
        }
    }
        fetchProfile();
}, []);

  if (profilePageAccount === null) {
    return <Spinner />
  }

  return (
    <Grid
        templateAreas={{
            base: `"profile" 
                "skills"
                "posts"`,
            lg: `"profile skills" 
                "posts skills"`,
        }}
        templateColumns={{ base: "1fr", md: "2fr 1fr" }}
        px={6}
        gap={4}
    >
        <GridItem w={'100%'} area={'profile'} >
            <HStack alignItems={'flex-start'}>
                <Image 
                    borderRadius='full'
                    boxSize='150px'
                    src={profilePageAccount.picture ? `/assets/${profilePageAccount.picture}` : 'https://i.imgur.com/uNL6B8O.png'}
                    alt='Dan Abramov'
                    border={'2px solid'}
                    borderColor={"whiteAlpha.600"}
                />
                <VStack justifyContent={'flex-start'} alignItems={'flex-start'} ml={3} flex={1} h={'100%'} gap={0}>
                    <Heading m={0} textAlign={'left'} fontWeight={'normal'} fontSize={['2xl', '3xl', '4xl']} display={'inline-block'} bgGradient={'linear(to-l, #7928CA 0%, #FF0080 100%)'} bgClip='text'>{profilePageAccount.name}</Heading>
                    {/* {profilePageAccount.location && */}
                        <Text align={'left'} marginBottom={2} fontWeight={'normal'} fontSize={'sm'} color="rgb(105, 107, 111)">{profilePageAccount.location} Los Angeles, CA</Text>
                    {/* } */}
                    {/* {profilePageAccount.bio &&  */}
                        <Text align={'left'} marginBottom={3} fontWeight={'normal'} fontSize={'md'} color="rgb(255, 255, 255)">{profilePageAccount.bio} Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vel facere voluptates necessitatibus magnam molestias obcaecati quos delectus est, culpa labore dolores nemo adipisci exercitationem error cumque officiis dolorum nam?</Text>
                    {/* } */}
                </VStack>
            </HStack>
            <HStack mt={2}>
                <Button
                    _hover={{
                        cursor: 'pointer',
                        backgroundColor: 'rgb(26, 29, 35)',
                        color: 'rgb(255, 255, 255)',
                        transition: 'all 0.3s ease-in-out',
                    }}
                    color={'rgb(204, 206, 209)'}
                    p={'.3rem 1rem'}
                    backgroundColor={'rgb(29, 33, 39)'}
                    borderRadius={50}
                    leftIcon={<BiPaperPlane />}
                >
                    Message
                </Button>
                <Button
                    variant='none' 
                    color='rgb(204, 206, 209)'
                    size={"md"}
                    leftIcon={isFollowingPostAuthor ? <BsFillPersonCheckFill /> : <BsPlusLg />}
                    // onClick={() => {
                    //     if (isFollowingPostAuthor) {
                    //         handleDeleteFollowing(person._id);
                    //     } else {
                    //         handleAddFollowing(person._id);
                    //     }
                    // }}
                    _hover={{
                        color: 'rgb(255, 255, 255)',
                        borderColor: 'rgb(255, 255, 255)',
                    }}
                >
                    {isFollowingPostAuthor ? "Following" : "Follow"}
                </Button>
            </HStack>
        </GridItem>
        <GridItem w={'100%'} bgColor={'white'} area={'posts'}>
            <Text>posts displayed</Text>
        </GridItem>
        <GridItem w={'100%'} bgColor={'white'} area={'skills'} h={'max-content'}>
            <Text>skills</Text>
        </GridItem>
    </Grid>
  )
}

export default ProfilePage