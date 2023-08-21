import { Link } from 'react-router-dom'
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai'
import { BsPeopleFill } from 'react-icons/bs'
import { BiSolidMessageRoundedDetail } from 'react-icons/bi'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        // <nav>
        //     <Link to="/orders">Order History</Link>
        //     &nbsp; | &nbsp;
        //     <Link to="/orders/new">New Order</Link>
        //     &nbsp;&nbsp; Welcome, {user.name}
        //     &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        // </nav>
        <Box w={'100vw'} position={'fixed'} top={0} zIndex={3} backgroundColor={'rgb(15, 16, 19)'}>
            <HStack width={{lg: '100%', '2xl': '1400px'}} m='5px auto' justifyContent={'space-between'} p={'.9rem 1.8rem .9rem 1.4rem'}>
                <HStack>
                    <Heading _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} as={'h1'} fontSize={{ base: '1.1rem', md: '1.3rem', lg: '1.5rem' }} color="rgb(255, 255, 255)" p={'.3rem .1rem'} borderColor={'rgb(255, 255, 255)'} borderBottom={'2px solid'} borderTop={'2px solid'}>
                        devConnect
                    </Heading>
                </HStack>
                <HStack gap={4}>
                    <VStack color={'rgb(204, 206, 209)'} gap={0} _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}}>
                        <AiFillHome fontSize={20}/>
                        <Text fontSize={15}>Home</Text>
                    </VStack>
                    <VStack color={'rgb(204, 206, 209)'} gap={0} _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}}>
                        <BsPeopleFill fontSize={20}/>
                        <Text fontSize={15}>Friends</Text>
                    </VStack>
                    <VStack color={'rgb(204, 206, 209)'} gap={0} _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}}>
                        <BiSolidMessageRoundedDetail fontSize={20}/>
                        <Text fontSize={15}>Messages</Text>
                    </VStack>
                    <Link to='/login'>
                        <HStack className="login-stack" _hover={{cursor: 'pointer', backgroundColor: 'rgb(26, 29, 35)', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} gap={0} color={'rgb(204, 206, 209)'} p={'.3rem 1rem'} backgroundColor={'rgb(29, 33, 39)'} borderRadius={50}>
                            <Text>Profile</Text>
                            <MdKeyboardArrowDown className="arrowdown-icon"/>
                        </HStack>
                    </Link>
                </HStack>
            </HStack>
        </Box>
    )
}