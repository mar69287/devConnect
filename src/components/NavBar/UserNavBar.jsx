import { Link } from 'react-router-dom'
import { Box, HStack, Heading, Text, VStack, Menu, MenuButton, MenuList, MenuItem, Button, MenuDivider, Show, Spinner, Hide, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, FormControl, Input } from '@chakra-ui/react'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai'
import { BsPeopleFill } from 'react-icons/bs'
import { BiSolidMessageRoundedDetail, BiSearchAlt2 } from 'react-icons/bi'
import * as userService from '../../utilities/users-service' 
import { deleteProfile } from '../../utilities/profiles-api';
import { useState, useEffect } from 'react';
import PersonCard from "../PersonCard"

export default function NavBar({ allProfiles, user, setUser, profile, following, setFollowing, setFollowingCount }) {
    const deleteDisclosure = useDisclosure();
    const searchDisclosure = useDisclosure();
    const [ userSearch, setUserSearch ] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([]);

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    const handleDeleteProfile = () => {
        deleteDisclosure.onOpen();
    }

    const handleDeleteConfirm = async () => {
        try {   
            await deleteProfile(user._id)
            userService.logOut()
            setUser(null)
        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    }

    const handleUserInputClick = () => {
        searchDisclosure.onOpen();
    }

    useEffect(() => {
        // Check if both profile and allProfiles are available
        if (profile && allProfiles.length > 0) {
            const searchQuery = userSearch.toLowerCase();
    
            const filtered = allProfiles.filter((user) =>
                user.userName.toLowerCase().includes(searchQuery) && user._id !== profile._id
            );
    
            setFilteredUsers(filtered);
        }
    }, [userSearch, allProfiles, profile]);
    

    return (
        <Box w={'100%'} position={'fixed'} top={0} left={0} zIndex={3} backgroundColor={'rgb(15, 16, 19)'}>
            <HStack width={{lg: '100%', '2xl': '1400px'}} m='5px auto' justifyContent={'space-between'} p={'.9rem 1.8rem .9rem 1.4rem'}>
                    <HStack>
                        <Link to="/feed">
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
                        </Link>
                        <Box onClick={handleUserInputClick} ml={2} color={'rgb(204, 206, 209)'} gap={0} _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}}>
                            <BiSearchAlt2 fontSize={30}/>
                        </Box>
                    </HStack>
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
                    {profile ? (
                        <>
                            <Menu>
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
                                    <MenuItem onClick={handleDeleteProfile}>
                                            <Text>Delete Profile</Text>
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={handleLogOut}>
                                        Log Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                             <Modal isOpen={searchDisclosure.isOpen} onClose={searchDisclosure.onClose} size={'md'} >
                                 <ModalOverlay />
                                 <ModalContent backgroundColor={'rgb(28, 30, 35)'}>
                                     <ModalHeader color="rgb(255, 255, 255)">Search User</ModalHeader>
                                     <ModalCloseButton color="rgb(255, 255, 255)"/>
                                     <HStack p={3}>
                                         <FormControl>
                                             <Input
                                                placeholder='userName'
                                                borderRadius={100}
                                                color={'whiteAlpha.800'}
                                                fontSize={'sm'}
                                                _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
                                                backgroundColor={'blackAlpha.300'}
                                                borderColor={'whiteAlpha.500'}
                                                focusBorderColor='whiteAlpha.600'
                                                onChange={(e) => setUserSearch(e.target.value)}
                                            />
                                        </FormControl>
                                        {/* <Button colorScheme='pink' borderRadius={50} type="submit" >Save</Button> */}
                                    </HStack>
                                    <VStack p={3}>
                                        {filteredUsers.map((filteredUser) => (
                                            <PersonCard
                                            key={filteredUser._id}
                                            person={filteredUser}
                                            following={following}
                                            setFollowing={setFollowing}
                                            setFollowingCount={setFollowingCount}
                                            profile={profile}
                                        />
                                        ))}
                                    </VStack>
                                </ModalContent>
                            </Modal>
                        </>
                    ) : (
                        <Spinner />
                    )}
                </HStack>
            </HStack>
            <AlertDialog isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} size='md'>
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Profile
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to delete this profile? This action cannot be undone.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button onClick={deleteDisclosure.onClose}>Cancel</Button>
                    <Button colorScheme='red' onClick={handleDeleteConfirm} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}