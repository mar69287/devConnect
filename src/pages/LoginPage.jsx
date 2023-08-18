import { AbsoluteCenter, Box, VStack, HStack, Heading } from '@chakra-ui/react'
import LoginForm from '../components/LoginForm/LoginForm'

export default function AuthPage({ setUser }) {
    return (
        <Box as='main' w={'100vw'} h={'100vh'}>
            <AbsoluteCenter>
                <HStack w={'100vw'} p={5}>
                    <VStack flex={1}>
                        <Heading color={'white'}>Welcome Back!</Heading>
                        <LoginForm setUser={setUser} />
                    </VStack>
                    <Box flex={1}>

                    </Box>
                </HStack>
            </AbsoluteCenter>
        </Box>
    )
}