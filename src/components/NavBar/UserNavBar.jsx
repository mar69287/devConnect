import { Link } from 'react-router-dom'
import { Box, HStack, Heading, Text, VStack, Menu, MenuButton, MenuList, MenuItem, Button, MenuDivider, Spinner, Hide, Show } from '@chakra-ui/react'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai'
import { BsPeopleFill } from 'react-icons/bs'
import { BiSolidMessageRoundedDetail } from 'react-icons/bi'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser, profile }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    

    return (
        <Box w={'100%'} position={'fixed'} top={0} left={0} zIndex={3} backgroundColor={'rgb(15, 16, 19)'}>
            <HStack width={{lg: '100%', '2xl': '1400px'}} m='5px auto' justifyContent={'space-between'} p={'.9rem 1.8rem .9rem 1.4rem'}>
                <Link to="/feed">
                    <HStack>
                        <Hide breakpoint='(max-width: 500px)'>
                            <Heading _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} as={'h1'} fontSize={{ base: '1.1rem', md: '1.3rem', lg: '1.5rem' }} color="rgb(255, 255, 255)" p={'.3rem .1rem'} borderColor={'rgb(255, 255, 255)'} borderBottom={'2px solid'} borderTop={'2px solid'}>
                                devConnect
                            </Heading>
                        </Hide>
                        <Show breakpoint='(max-width: 500px)'>
                            <Heading _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} as={'h1'} fontSize={{ base: '1.1rem', md: '1.3rem', lg: '1.5rem' }} color="rgb(255, 255, 255)" p={'.3rem .1rem'} borderColor={'rgb(255, 255, 255)'} borderBottom={'2px solid'} borderTop={'2px solid'}>
                                DC
                            </Heading>
                        </Show>
                    </HStack>
                </Link>
                <HStack gap={4}>
                        <Link to="/feed">
                            <VStack color={'rgb(204, 206, 209)'} gap={0} _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}}>
                                <AiFillHome fontSize={20}/>
                                <Hide breakpoint='(max-width: 375px)'>
                                    <Text fontSize={15}>Home</Text>
                                </Hide>
                            </VStack>
                        </Link>
                    <Link to="/friends">
                        <VStack color={'rgb(204, 206, 209)'} gap={0} _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}}>
                            <BsPeopleFill fontSize={20}/>
                            <Hide breakpoint='(max-width: 375px)'>
                                <Text fontSize={15}>Friends</Text>
                            </Hide>
                        </VStack>
                    </Link>
                    <Link to="/messaging">
                        <VStack color={'rgb(204, 206, 209)'} gap={0} _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}}>
                            <BiSolidMessageRoundedDetail fontSize={20}/>
                            <Hide breakpoint='(max-width: 375px)'>
                                <Text fontSize={15}>Messages</Text>
                            </Hide>
                        </VStack>
                    </Link>
                    {profile ? (<Menu>
                        <MenuButton
                            className="login-stack"
                            _hover={{
                            cursor: 'pointer',
                            backgroundColor: 'rgb(26, 29, 35)',
                            color: 'rgb(183, 184, 185)',
                            transition: 'all 0.3s ease-in-out',
                            }}
                            gap={0}
                            color={'rgb(204, 206, 209)'}
                            p={'.3rem 1rem'}
                            backgroundColor={'rgb(29, 33, 39)'}
                            _expanded={{ bg: 'rgb(26, 29, 35)' }}
                            borderRadius={50}
                            as={Button}
                        >
                            <HStack>
                                <Hide breakpoint='(max-width: 500px)'>{profile.name}</Hide>
                                <MdKeyboardArrowDown className="arrowdown-icon" />
                            </HStack>
                        </MenuButton>
                        <MenuList>
                                <Link to={`/profile/${profile.userName}`}>
                            <MenuItem>
                                    <Text>View Profile</Text>
                            </MenuItem>
                                </Link>
                                <Link to={`/profile/${profile.userName}/edit`}>
                            <MenuItem>
                                    <Text>Edit Profile</Text>
                            </MenuItem>
                                </Link>
                            <MenuDivider />
                            <MenuItem onClick={handleLogOut}>
                                Log Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    ) : (
                        <Spinner />
                    )}
                </HStack>
            </HStack>
        </Box>
    )
}