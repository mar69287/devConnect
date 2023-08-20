import { AbsoluteCenter, Box, VStack, HStack, Heading, Image, Show } from '@chakra-ui/react'
import SignUpForm from '../components/SignUpForm/SignUpForm'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

const SignUpPage = ({ setUser }) => {
  return (
    <Box as='main' w={'100vw'} h={'100vh'}>
            <AbsoluteCenter>
                <HStack width={{base: '100vw', '2xl': '1400px'}} p={5}>
                    <VStack flex={1}>
                        <Heading color={'white'} fontSize={'2xl'} textAlign={'center'} mb={3}>Let's create an account!</Heading>
                        <SignUpForm setUser={setUser}/>
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

export default SignUpPage