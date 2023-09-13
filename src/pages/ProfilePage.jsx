import { Grid, GridItem, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { useParams } from "react-router-dom";

const ProfilePage = ({ profile }) => {
  const { userName } = useParams();
    
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
            <HStack>
                <Image 
                    borderRadius='full'
                    boxSize='150px'
                    src={profile.picture ? `/assets/${profile.picture}` : 'https://i.imgur.com/uNL6B8O.png'}
                    alt='Dan Abramov'
                    border={'2px solid'}
                    borderColor={"whiteAlpha.600"}
                />
                <VStack justifyContent={'flex-start'}>
                    <Heading align={'left'} fontWeight={'normal'} fontSize={['2xl', '3xl', '4xl']} display={'inline-block'} bgGradient={'linear(to-l, #7928CA 0%, #FF0080 100%)'} bgClip='text'>{profile.name}</Heading>
                </VStack>
            </HStack>
            <Text display={'inline-block'} bgGradient={'linear(to-l, #7928CA 0%, #FF0080 100%)'} bgClip='text'>profile info</Text>
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