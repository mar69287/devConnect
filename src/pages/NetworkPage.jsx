import { Grid, GridItem, Heading, Button, VStack, SimpleGrid, Text, HStack } from "@chakra-ui/react"
import { FaPeopleGroup } from 'react-icons/fa6'
import { BsFillPeopleFill } from 'react-icons/bs'
import PersonCard from "../components/PersonCard"
import { useState } from "react"

const NetworkPage = ({ profile, followers, setFollowers, followersCount, setFollowersCount, following, setFollowing, followingCount, setFollowingCount }) => {
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
                    <Button
                        variant='none'
                        color={followingComponent ? '#7928CA' : 'rgb(204, 206, 209)' }
                        size={"md"}
                        leftIcon={<FaPeopleGroup /> }
                        _hover={{
                            color: 'rgb(255, 255, 255)',
                            borderColor: 'rgb(255, 255, 255)',
                        }}
                        onClick={() => setFollowingComponent(true)}
                    >
                        Following
                    </Button>
                    <Text color="whiteAlpha.800" fontSize='sm'>{followingCount}</Text>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Button
                        variant='none'
                        color={followingComponent ? 'rgb(204, 206, 209)' : '#7928CA' }
                        size={"md"}
                        leftIcon={<BsFillPeopleFill /> }
                        _hover={{
                            color: 'rgb(255, 255, 255)',
                            borderColor: 'rgb(255, 255, 255)',
                        }}
                        onClick={() => setFollowingComponent(false)}
                    >
                        Followers
                    </Button>
                    <Text color="whiteAlpha.800" fontSize='sm'>{followersCount}</Text>
                </HStack>
            </VStack>
      </GridItem>

      <GridItem  h={'max-content'} as="main" py={3} px={4} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}>
        <SimpleGrid spacing={4} columns={[1]} w={'100%'}>
            {followingComponent ? (
                <Text align={'left'} color={"transparent"} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.3rem'}>Following</Text>
            ) : (
                <Text align={'left'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.3rem'}>Followers</Text>
                
            )} 
            {followingComponent && following.map((person) => (
                <PersonCard
                    key={person._id}
                    person={person}
                    following={following}
                    setFollowing={setFollowing}
                    setFollowingCount={setFollowersCount}
                    profile={profile}
                />
            ))}

            {!followingComponent && followers.map((person) => (
                <PersonCard
                    key={person._id}
                    person={person}
                    following={following}
                    setFollowing={setFollowing}
                    setFollowingCount={setFollowersCount}
                    profile={profile}
                />
            ))}
        </SimpleGrid>
      </GridItem>
    </Grid>
  )
}

export default NetworkPage
