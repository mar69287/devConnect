import { AbsoluteCenter, Box, VStack, HStack, Heading, Image } from '@chakra-ui/react'
import LoginForm from '../components/LoginForm/LoginForm'
import logo from '../assets/logo.png'

export default function AuthPage({ setUser }) {
    return (
        <Box as='main' w={'100vw'} h={'100vh'}>
            <AbsoluteCenter>
                <HStack width={{base: '100vw', '2xl': '1400px'}} p={5}>
                    <VStack flex={1}>
                        <Heading color={'white'}>Welcome Back!</Heading>
                        <LoginForm setUser={setUser} />
                    </VStack>
                    <Box flex={1}>
                        <Image src={logo} />
                    </Box>
                </HStack>
            </AbsoluteCenter>
        </Box>
    )
}