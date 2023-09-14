import { Grid, GridItem, HStack, Heading, Image, Text, VStack, Spinner, Button, Box, Input,  } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import {  getProfile, addSkill, addFollowing, deleteFollowing } from "../utilities/profiles-api"
import {  getProfilePosts } from "../utilities/posts-api"
import { useState, useEffect } from "react"
import { BsFillPersonCheckFill, BsPlusLg, BsTrash2 } from 'react-icons/bs'
import { BiPaperPlane } from 'react-icons/bi'
import PostCard from "../components/PostCard"

const ProfilePage = ({ profile, following, setFollowing, setFollowingCount }) => {
  const { userName } = useParams();
  const [profilePageAccount, setProfilePageAccount] = useState({})
  const [posts, setPosts] = useState([])
  const [skills, setSkills] = useState([])
  const [showSkillInput, setShowSkillInput] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [skillError, setSkillError] = useState(false)
  const [displaySkills, setDisplaySkills] = useState(true)
//   const [isFollowingProfile, setIsFollowingProfile] = useState(false)
//   const [ profileFollowing, setProfileFollowing] = useState([])
//   const [ profileFollowers, setProfileFollowers] = useState([])
//   const [ profileFollowingCount, setProfileFollowingCount] = useState(0)
//   const [ profileFollowersCount, setProfileFollowersCount] = useState(0)

  useEffect(() => {
    async function fetchProfile() {
        try {
            const profileData = await getProfile(userName);
            setProfilePageAccount(profileData);
            const profilePosts = await getProfilePosts(profileData._id)
            setPosts(profilePosts)

            const skillsArray = profileData.skills.map((skillObject) => skillObject.skill);
            setSkills(skillsArray)

            if(posts.length > 1) {
                const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            }

            // setIsFollowingProfile(following.some((followedProfile) => followedProfile._id === profilePageAccount._id))
            // setProfileFollowers(profileData.followers)
            // setProfileFollowersCount(profileData.followers.length)
            // setProfileFollowing(profileData.following)
            // setProfileFollowingCount(profileData.following.length)
        } catch (error) {
            console.error(error);
        }
    }
        fetchProfile();
}, [userName, following, profilePageAccount._id]);

const displaySkillInput = () => {
    setShowSkillInput(!showSkillInput)
    setSkillError(false)
}

const handleAddSkill = async () => {
    if (skillInput.trim() === '') {
        return;
    }

    if (skills.includes(skillInput)) {
        setSkillError(true);
        return;
    }

    try {
        const skill = skillInput
        const newSkill = await addSkill(profilePageAccount._id, skill);
        setSkills((prevSkills) => [...prevSkills, newSkill])
        setSkillInput('')
        setSkillError(false);
    } catch (error) {
        console.error("Error adding skill:", error);
    }
}

// const handleAddFollowing = async (profilePageId) => {
//     try {
//         const newFollowing = await addFollowing(profile._id, profilePageId);
//         setFollowing((prev) => [...prev, newFollowing]);
//         setFollowingCount((prevTotal) => prevTotal + 1);
//         setIsFollowingProfile(true)
//     } catch (error) {
//         console.error("Error adding like:", error);
//     }
// }

// const handleDeleteFollowing = async (profilePageId) => {
//     try {
//         await deleteFollowing(profile._id, profilePageId);
//         setFollowing((prevFollowing) => prevFollowing.filter((prof) => prof._id !== profilePageId));
//         setFollowingCount((prevTotal) => prevTotal - 1);
//         setIsFollowingProfile(false)
//     } catch (error) {
//         console.error("Error adding like:", error);
//     }
//     // console.log(profileId)
// }

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
                {/* <Button
                    variant='none' 
                    color='rgb(204, 206, 209)'
                    size={"md"}
                    leftIcon={isFollowingProfile ? <BsFillPersonCheckFill /> : <BsPlusLg />}
                    onClick={() => {
                        if (isFollowingProfile) {
                            handleDeleteFollowing(profilePageAccount._id);
                        } else {
                            handleAddFollowing(profilePageAccount._id);
                        }
                    }}
                    _hover={{
                        color: 'rgb(255, 255, 255)',
                        borderColor: 'rgb(255, 255, 255)',
                    }}
                >
                    {isFollowingProfile ? "Following" : "Follow"}
                </Button> */}
            </HStack>
        </GridItem>
        <GridItem w={'100%'} area={'posts'}>
                {posts.map((post) => (
                    <PostCard key={post._id} posts={posts} post={post} profile={profile} setPosts={setPosts} following={following} setFollowing={setFollowing} setFollowingCount={setFollowingCount} />
                ))}
        </GridItem>
        <GridItem w={'100%'} p={3} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10} area={'skills'} h={'max-content'}>
            <HStack mb={0} justifyContent={'space-between'}>
                <Heading align={'center'} fontWeight={'normal'} size={'md'} color="rgb(255, 255, 255)">Tech Skills</Heading>
                <Box
                    color="rgb(204, 206, 209)"
                    _hover={{
                        color: 'rgb(255, 255, 255)',
                        cursor: 'pointer'
                    }}
                    onClick={displaySkillInput}
                >
                    <BsPlusLg/>
                </Box>
            </HStack>
            {showSkillInput && (
                <HStack w={'100%'} mt={3}>
                    <Input
                        borderRadius={100}
                        placeholder="Add skill..."
                        color={'whiteAlpha.800'}
                        fontSize={'sm'}
                        size={'sm'}
                        _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                        backgroundColor={'blackAlpha.300'}
                        borderColor={'whiteAlpha.500'}
                        focusBorderColor='whiteAlpha.600'
                        onChange={(e) => setSkillInput(e.target.value)}
                        value={skillInput}                  
                    />
                    <Button
                        backgroundColor='#7928CA' 
                        color='rgb(255, 255, 255)' 
                        borderRadius='full' 
                        px={4} 
                        _hover={{
                            backgroundColor: 'purple.600', 
                            color: 'white', 
                        }}
                        fontSize='md' 
                        size={'sm'}
                        onClick={() => handleAddSkill()}
                    >
                    Save
                    </Button>
                </HStack>
            )}
            {skillError && 
                <Text align={'center'} mt={2} fontWeight={'normal'} fontSize={'md'} color="red">Must be unique skill</Text>
            }
            {skills.length > 0 && 
             <Text 
                align={'right'} 
                mt={2} 
                fontWeight={'normal'} 
                fontSize={'xs'} 
                color="rgb(204, 206, 209)"
                _hover={{
                    color: 'rgb(255, 255, 255)',
                    cursor: 'pointer'
                }}
                onClick={() => setDisplaySkills(!displaySkills)}
             >
                {displaySkills ? 'Hide' : 'Show'} Skills
            </Text>
            }
            {displaySkills && skills.map((skill, index) => (
                <HStack mt={1} key={index} justifyContent={'space-between'}>
                    <Text color={'rgb(204, 206, 209)'} key={index}>{skill}</Text>
                    <Box
                        color="rgb(204, 206, 209)"
                        _hover={{
                            color: 'rgb(255, 255, 255)',
                            cursor: 'pointer'
                        }}
                        onClick={displaySkillInput}
                    >
                        <BsTrash2 fontSize={'.9rem'}/>
                    </Box>
                </HStack>
            ))}
        </GridItem>
    </Grid>
  )
}

export default ProfilePage