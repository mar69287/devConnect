import { Center, HStack, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md'; 
import './NavBar.css';

const NonUserNavBar = () => {
  return (
    <HStack width={{xl: '100%', '2xl': '1400px'}} m='5px auto' justifyContent={'space-between'} p='.9rem 1.2rem'>
        <HStack>
            <Heading _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} as={'h1'} fontSize={{ base: '1.1rem', md: '1.3rem', lg: '1.5rem' }} color="rgb(255, 255, 255)" p={'.3rem .1rem'} borderColor={'rgb(255, 255, 255)'} borderBottom={'2px solid'} borderTop={'2px solid'}>
                devConnect
            </Heading>
        </HStack>
        <HStack className="login-stack" _hover={{cursor: 'pointer', backgroundColor: 'rgb(26, 29, 35)', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} gap={0} color={'rgb(204, 206, 209)'} p={'.3rem 1rem'} backgroundColor={'rgb(29, 33, 39)'} borderRadius={50}>
            <Link to='/auth'>Login</Link>
                <MdKeyboardArrowRight className="arrow-icon"/>
        </HStack>
    </HStack>
  )
}

export default NonUserNavBar