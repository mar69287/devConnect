import { Flex, VStack, Image, Heading, Text, Divider, HStack, Spinner, Button } from "@chakra-ui/react"
import { TiLocationArrowOutline } from 'react-icons/ti'
import { useEffect, useState } from 'react'
import { getProfile } from '../utilities/profiles-api'
import { getPosts } from "../utilities/posts-api"
import PostInput from "../components/PostInput"
import Posts from "../components/Posts"
import PostCard from "../components/PostCard"

const FeedPage = ({ profile, setProfile, user, followers, setFollowers, followersCount, setFollowersCount, following, setFollowing, followingCount, setFollowingCount }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchProfile() {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
                setFollowers(profileData.followers)
                setFollowersCount(profileData.followers.length)
                setFollowing(profileData.following)
                setFollowingCount(profileData.following.length)
                const posts = await getPosts();
                const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            } catch (error) {
                console.error(error);
            }
        }
            fetchProfile();
    }, []);

  return (
    <Flex w={'100%'} direction={['column', 'row']} gap={8} px={10} py={5}>
      {profile ? (
        <>
            <VStack gap={2} py={3} px={4} w={['100%', '25%']} h={'max-content'} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}>
                <Image
                    borderRadius='full'
                    boxSize='70px'
                    src={profile.picture ? `/assets/${profile.picture}` : 'https://bit.ly/dan-abramov'}
                    alt='Dan Abramov'
                    // mt={1}
                    border={'2px solid'}
                    borderColor={"whiteAlpha.600"}
                />
                <Heading  color="rgb(255, 255, 255)" size='md'>{profile.name}</Heading>
                <Divider  borderColor={"whiteAlpha.300"} />
                <Text align={"center"} color="whiteAlpha.800" fontSize='sm'>{profile.bio}</Text>
                <HStack color="whiteAlpha.800" justifyContent={'flex-start'} w={'100%'}>
                    <TiLocationArrowOutline fontSize={20}/>
                    <Text fontSize='sm'>{profile.location}</Text>
                </HStack>
                <Divider  borderColor={"whiteAlpha.300"} />
                <HStack  justifyContent={'space-between'} w={'100%'}>
                    <Text color="whiteAlpha.600" fontSize='sm'>Followers</Text>
                    <Text color="whiteAlpha.800" fontSize='sm'>{followersCount}</Text>
                </HStack>
                <HStack  justifyContent={'space-between'} w={'100%'}>
                    <Text color="whiteAlpha.600" fontSize='sm'>Following</Text>
                    <Text color="whiteAlpha.800" fontSize='sm'>{followingCount}</Text>
                </HStack>
            </VStack>
            <VStack w={['100%', '50%']} gap={4}>
                <VStack gap={0} py={3} px={4} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10} w={'100%'}>
                    <HStack  w={'100%'} >
                        <Image
                            borderRadius='full'
                            boxSize='40px'
                            src={profile.picture ? `/assets/${profile.picture}` : 'https://bit.ly/dan-abramov'}
                            alt='Dan Abramov'
                            // mt={1}
                            border={'2px solid'}
                            borderColor={"whiteAlpha.600"}
                        />
                        <PostInput user={user} profile={profile} setPosts={setPosts} />
                    </HStack>
                    {/* <Divider  borderColor={"whiteAlpha.300"} />
                    <HStack mt={2} justifyContent={"space-between"} w={'100%'}>
                        <Button h={10}  fontSize={'sm'} leftIcon={<BsCardImage />} colorScheme='whiteAlpha' variant={"ghost"}>
                            Photo
                        </Button>
                        <Button h={7} w={14} size={"sm"} fontSize={'sm'} colorScheme='pink' borderRadius={50}>Post</Button>
                    </HStack> */}
                </VStack>
                {posts.map((post) => (
                    <PostCard key={post._id} posts={posts} post={post} profile={profile} setPosts={setPosts} following={following} setFollowing={setFollowing} setFollowingCount={setFollowingCount} />
                ))}
                {/* <Posts posts={posts} profile={profile} setPosts={setPosts} /> */}
            </VStack>
            <VStack w={['100%', '25%']} h={'max-content'} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}>
    
            </VStack>
        </>
        ) : (
            <Spinner />
        )}
    </Flex>
  )
}

export default FeedPage