import { Box, HStack, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md'; 
import './NavBar.css';

const NonUserNavBar = () => {
  return (
    <Box w={'100%'} position={'fixed'} top={0} left={0} zIndex={3} backgroundColor={'rgb(15, 16, 19)'}>
      <HStack width={{lg: '100%', '2xl': '1400px'}} m='5px auto' justifyContent={'space-between'} p={'.9rem 1.8rem .9rem 1.4rem'}>
          <HStack>
              <Heading _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} as={'h1'} fontSize={{ base: '1.1rem', md: '1.3rem', lg: '1.5rem' }} color="rgb(255, 255, 255)" p={'.3rem .1rem'} borderColor={'rgb(255, 255, 255)'} borderBottom={'2px solid'} borderTop={'2px solid'}>
                  devConnect
              </Heading>
          </HStack>
          <Link to='/login'>
            <HStack className="login-stack" _hover={{cursor: 'pointer', backgroundColor: 'rgb(26, 29, 35)', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} gap={0} color={'rgb(204, 206, 209)'} p={'.3rem 1rem'} backgroundColor={'rgb(29, 33, 39)'} borderRadius={50}>
              <Text>Login</Text>
              <MdKeyboardArrowRight className="arrow-icon"/>
            </HStack>
          </Link>
      </HStack>
    </Box>
  )
}

export default NonUserNavBar