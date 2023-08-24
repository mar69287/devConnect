import { Flex, VStack, Image, Heading, Text, Divider, HStack, Spinner } from "@chakra-ui/react"
import { TiLocationArrowOutline } from 'react-icons/ti'
import { useEffect } from 'react'
import { getProfile } from '../utilities/profiles-api'

const FeedPage = ({ profile, setProfile }) => {
    useEffect(() => {
        async function fetchProfile() {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
            } catch (error) {
                console.error(error);
            }
        }
            fetchProfile();
    }, []);

  return (
    <Flex w={'100%'} direction={['column', 'row']} gap={10} px={10} py={5}>
      {profile ? (
        <>
            <VStack gap={2} py={3} px={4} w={['100%', '25%']} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}>
                <Image
                    borderRadius='full'
                    boxSize='70px'
                    src='https://bit.ly/dan-abramov'
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
                    <Text color="whiteAlpha.800" fontSize='sm'>{profile.followers.length}</Text>
                </HStack>
                <HStack  justifyContent={'space-between'} w={'100%'}>
                    <Text color="whiteAlpha.600" fontSize='sm'>Following</Text>
                    <Text color="whiteAlpha.800" fontSize='sm'>{profile.following.length}</Text>
                </HStack>
            </VStack>
            <VStack w={['100%', '50%']} >
                <VStack gap={2} py={3} px={4} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10} w={'100%'}>
                    <HStack>
                    <Image
                        borderRadius='full'
                        boxSize='40px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                        // mt={1}
                        border={'2px solid'}
                        borderColor={"whiteAlpha.600"}
                    />
                    </HStack>
                </VStack>
            </VStack>
            <VStack w={['100%', '25%']} backgroundColor={'rgb(28, 30, 35)'} borderColor={'WhiteAlpha300'} border={'2px solid'} borderRadius={10}>
    
            </VStack>
        </>
        ) : (
            <Spinner />
        )}
    </Flex>
  )
}

export default FeedPage