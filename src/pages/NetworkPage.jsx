import { Grid, GridItem, Heading, Button, VStack, SimpleGrid, Text, HStack, Card, Box, Flex } from "@chakra-ui/react"
import { FaPeopleGroup } from 'react-icons/fa6'
import { BsFillPeopleFill } from 'react-icons/bs'
import PersonCard from "../components/PersonCard"
import { useState } from "react"
import { color, motion } from "framer-motion";
import NetworkCard from "../components/NetworkCard"


const NetworkPage = ({ profile, followers, followersCount, setFollowersCount, following, setFollowing, followingCount, setFollowingCount }) => {
  const [followingComponent, setFollowingComponent] = useState(true)

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 3fr" }}
      gap={4}
      px={10} py={5}
    >
      <GridItem h={'max-content'} as="aside" py={3} px={4} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}>
            <Heading mb={3} textAlign={"center"}  color="rgb(255, 255, 255)" size='md'>My Network</Heading>
            <VStack w={'100%'} alignItems={'flex-start'}>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <motion.div
                        style={{
                            padding: '.5rem 1rem',
                            backgroundColor: followingComponent ? '#7928CA' : 'rgb(28, 30, 35)',
                            display: 'flex',
                            fontWeight: 600,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            position: 'relative',
                            overflow: 'hidden', 
                            gap: 8,
                            color: '#FFF'
                        }}
                        whileHover={{
                            cursor: 'pointer',
                        }}
                        whileTap={{
                            scale: .9,
                        }}
                        onClick={() => setFollowingComponent(true)}
                    >
                        <FaPeopleGroup />
                        Following
                    </motion.div>
                    <Text color="whiteAlpha.800" fontSize='sm'>{followingCount}</Text>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <motion.div
                        style={{
                            padding: '.5rem 1rem',
                            backgroundColor: followingComponent ? 'rgb(28, 30, 35)' : '#7928CA',
                            display: 'flex',
                            fontWeight: 600,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            position: 'relative',
                            overflow: 'hidden', 
                            gap: 8,
                            color: '#FFF'
                        }}
                        whileHover={{
                            cursor: 'pointer',
                        }}
                        whileTap={{
                            scale: .9,
                        }}
                        onClick={() => setFollowingComponent(false)}
                    >
                        <BsFillPeopleFill />
                        Followers
                    </motion.div>
                    <Text color="whiteAlpha.800" fontSize='sm'>{followersCount}</Text>
                </HStack>
            </VStack>
      </GridItem>

      {/* <GridItem  h={'max-content'} as="main" py={3} px={4} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}> */}
      <GridItem  h={'max-content'} as="main" py={3} px={4}>
            {followingComponent ? (
                <Text mb={5} align={'left'} color={"transparent"} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.3rem'}>Following</Text>
            ) : (
                <Text mb={5} align={'left'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.3rem'}>Followers</Text>
                
            )} 
        <Flex spacing={4} gap={10} w={'100%'} alignItems={'center'} justifyContent={['center','center','start']} flexWrap={'wrap'} >
            {followingComponent && following.map((person) => (
                // <PersonCard
                //     key={person._id}
                //     person={person}
                //     following={following}
                //     setFollowing={setFollowing}
                //     setFollowingCount={setFollowersCount}
                //     profile={profile}
                // />
                <NetworkCard key={person._id} person={person} followingComponent={followingComponent} profile={profile} setFollowing={setFollowing} setFollowingCount={setFollowingCount} following={following} />

            ))}

            {!followingComponent && followers.map((person) => (
                // <PersonCard
                //     key={person._id}
                //     person={person}
                //     following={following}
                //     setFollowing={setFollowing}
                //     setFollowingCount={setFollowersCount}
                //     profile={profile}
                // />
                <NetworkCard key={person._id} person={person} followingComponent={followingComponent} profile={profile} setFollowing={setFollowing} setFollowingCount={setFollowingCount} following={following} />

            ))}
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default NetworkPage
