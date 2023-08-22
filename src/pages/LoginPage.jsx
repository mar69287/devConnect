import { AbsoluteCenter, Box, VStack, HStack, Heading, Image, Show } from '@chakra-ui/react'
import LoginForm from '../components/LoginForm/LoginForm'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

export default function AuthPage({ setUser }) {
    return (
        <Box >
            <AbsoluteCenter>
                <HStack width={{base: '100vw', '2xl': '1400px'}} p={5}>
                    <VStack flex={1}>
                        <Heading color={'white'}>Welcome Back!</Heading>
                        <LoginForm setUser={setUser} />
                    </VStack>
                    <Show breakpoint='(min-width: 600px)'>
                        <Box flex={1}>
                            <Link to={'/'}>
                                <Image src={logo} border="1px solid transparent" transition="border-color 0.3s ease" _hover={{ borderColor: 'rgb(183, 184, 185)' }}/>
                            </Link>
                        </Box>
                    </Show>
                </HStack>
            </AbsoluteCenter>
        </Box>
    )
}