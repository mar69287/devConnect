import { HStack, VStack, Heading, Stack, Text, Divider } from '@chakra-ui/react'
import React from 'react'

const Target = () => {
  return (
    <Stack direction={['column', 'column', 'row']} gap={10} as={'section'} h={'30rem'} width={{xl: '100%', '2xl': '1400px'}} m='0 auto' p={'0 1rem'} justifyContent={'center'}>
        <VStack alignItems={'flex-start'} w={'28rem'}>
            <Heading  fontWeight={'normal'} fontSize={['xl', '2xl', '3xl']} color="rgb(255, 255, 255)">Who is devConnect for?</Heading>
            <Heading  marginBottom={3} fontWeight={'normal'} fontSize={['xl', '2xl', '3xl']} color="rgb(105, 107, 111)">Developers of all backgrounds.</Heading>
            <Text fontSize={['md', 'lg']} color="rgb(255, 255, 255)">Graduates</Text>
            <Divider borderColor="rgb(123, 125, 128)" />
            <Text fontSize={['md', 'lg']} color="rgb(255, 255, 255)">Bootcamp students</Text>
            <Divider borderColor="rgb(123, 125, 128)" />
            <Text fontSize={['md', 'lg']} color="rgb(255, 255, 255)">Self-taught programmers</Text>
        </VStack>
        <VStack h={'100%'} alignItems={'flex-start'} w={{base: '100%', md:'40rem'}}>
            <Text align={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'.9rem'}>BUILD</Text>
            <Heading  marginBottom={3} fontWeight={'normal'} fontSize={['xl', '2xl', '3xl']} color="rgb(255, 255, 255)">Opportunity and Experience.</Heading>
            <Text fontSize={['md', 'lg']} color="rgb(123, 125, 128)">We get it – no matter how you found your way into the developer world, breaking in isn't always a breeze. With DevConnect, we're here to help you shine. Show off your skills, connect with others like you, and get the exposure you deserve in the industry.</Text>
        </VStack>
    </Stack>
  )
}

export default Target