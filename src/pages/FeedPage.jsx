import { VStack, Image, Heading, Text, Divider, HStack, Spinner, Link, List, ListItem, Hide, Grid, GridItem, Progress } from "@chakra-ui/react"
import { TiLocationArrowOutline } from 'react-icons/ti'
import { useEffect, useState } from 'react'
import { getUserProfile, getAllProfiles } from '../utilities/profiles-api'
import { getPosts } from "../utilities/posts-api"
import { authenticate } from "../utilities/messages-api"
import PostInput from "../components/PostInput"
import PostCard from "../components/PostCard"

const FeedPage = ({ setAllProfiles, setChatUser, profile, setProfile, user, followers, setFollowers, followersCount, setFollowersCount, following, setFollowing, followingCount, setFollowingCount }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingValue, setLoadingValue] = useState(0)
    const [loadingColor, setLoadingColor] = useState('purple')

    useEffect(() => {
        localStorage.setItem('lastVisitedPage', '/feed');
        async function fetchProfile() {
            try {
                setLoadingValue(20)
                const allProfiles = await getAllProfiles()
                setAllProfiles(allProfiles)
                const profileData = await getUserProfile();
                setProfile(profileData);
                setFollowers(profileData.followers)
                setFollowersCount(profileData.followers.length)
                setFollowing(profileData.following)
                setFollowingCount(profileData.following.length)
                setLoadingValue(40)
                setLoadingColor('pink')
                const chatData = await authenticate({username: profileData.userName})
                setChatUser({ ...chatData, secret: profileData.userName });
                setLoadingValue(80)
                const posts = await getPosts();
                const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
                setLoadingValue(100)
                setLoadingColor('red')
                // setTimeout(() => setLoading(false), 1000)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
            fetchProfile();
    }, []);

    const resources = [
        {
            name: 'Codedex',
            link: 'https://www.codedex.io/',
        },
        {
            name: 'Coddy',
            link: 'https://coddy.tech/',
        },
        {
            name: 'Developer Roadmaps',
            link: 'https://roadmap.sh/',
        },
        {
            name: 'Free Code Camp',
            link: 'https://www.freecodecamp.org/',
        },
        {
            name: 'Programming with Mosh',
            link: 'https://www.youtube.com/@programmingwithmosh',
        },
      
    ];

    if (loading){
        return <Progress colorScheme={loadingColor} value={loadingValue}/>
    }

  return (
    <Grid
        templateAreas={{
            base: `"profile"
                "posts"
                "references"`,
            md: `"profile posts references"`,
        }}
        templateColumns={{ base: "1fr", md: "1fr 2fr 1fr" }}
        px={6}
        gap={4}
    >
        {profile ? (
            <>
                <GridItem w={'100%'} area={'profile'}>
                    <VStack gap={2} py={3} px={4} h={'max-content'}>
                        <Image
                            objectFit={'cover'}
                            borderRadius='full'
                            boxSize='70px'
                            src={profile.picture ? `${profile.picture}` : 'https://i.imgur.com/uNL6B8O.png'}
                            alt='Dan Abramov'
                            border={'2px solid'}
                            borderColor={"whiteAlpha.600"}
                        />
                        <Heading display={'inline-block'} bgGradient={'linear(to-l, #7928CA 0%, #FF0080 100%)'} bgClip='text' size='md'>{profile.name}</Heading>
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
                </GridItem>
                <GridItem w={'100%'} area={'posts'}>
                    <VStack py={3} px={4} mb={2} bgGradient='linear(to-t, rgb(18,18,18), rgb(31,31,31))' border={'2px solid rgb(50,50,50)'} borderRadius={10} w={'100%'}>
                        <HStack  w={'100%'} >
                            <Image
                                borderRadius='full'
                                boxSize='40px'
                                src={profile.picture ? `${profile.picture}` : 'https://i.imgur.com/uNL6B8O.png'}
                                alt='profile picture'
                                border={'2px solid'}
                                borderColor={"whiteAlpha.600"}
                            />
                            <PostInput user={user} profile={profile} setPosts={setPosts} />
                        </HStack>
                    </VStack>
                    {posts.map((post) => (
                        <PostCard key={post._id} posts={posts} post={post} profile={profile} setPosts={setPosts} following={following} setFollowing={setFollowing} setFollowingCount={setFollowingCount} />
                    ))}
                </GridItem>
                <Hide below='md'>
                    <GridItem w={'100%'} area={'references'}>
                        <VStack py={3} px={4} h={'max-content'} bgGradient='linear(to-t, rgb(18,18,18), rgb(31,31,31))' border={'2px solid rgb(50,50,50)'} borderRadius={10}>
                            <Heading textAlign={'center'} color="rgb(255, 255, 255)" size='sm'>Learning to code or just want more practice?</Heading>
                            <Text align={"center"} color="whiteAlpha.800" fontSize='sm'>Below we'll share some great resources for you to check out.</Text>
                            <List spacing={2} mt={2} textAlign="left" w={'100%'}>
                                {resources.map((resource, index) => (
                                    <ListItem key={index}>
                                        <Link
                                            href={resource.link}
                                            isExternal
                                            color="purple.400"
                                            textDecoration="none"
                                            _hover={{ color: "purple.800" }}
                                        >
                                            {resource.name}
                                        </Link>
                                    </ListItem>
                                    ))}
                                </List>
                        </VStack>
                    </GridItem>
                </Hide>
            </>
        ) : (
            <Spinner />
        )}

    </Grid>
  )
}

export default FeedPage