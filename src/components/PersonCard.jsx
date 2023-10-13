import { Box, Button, Divider, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsFillPersonCheckFill, BsPlusLg } from 'react-icons/bs'
import { useState } from "react"
import { addFollowing, deleteFollowing } from '../utilities/profiles-api'

const PersonCard = ({ person, following, setFollowing, setFollowingCount, profile }) => {
    const [isFollowingPostAuthor, setIsFollowingPostAuthor] = useState(following.some((followedProfile) => followedProfile._id === person._id));
    
    const handleAddFollowing = async (followerId) => {
        try {
            const newFollowing = await addFollowing(profile._id, followerId);
            setFollowing((prev) => [...prev, newFollowing]);
            setFollowingCount((prevTotal) => prevTotal + 1);
            setIsFollowingPostAuthor(true)
        } catch (error) {
            console.error("Error adding follow:", error);
        }
    }
    const handleDeleteFollowing = async (followerId) => {
        try {
            await deleteFollowing(profile._id, followerId);
            setFollowing((prevFollowing) => prevFollowing.filter((profile) => profile._id !== followerId));
            setFollowingCount((prevTotal) => prevTotal - 1);
            setIsFollowingPostAuthor(false)
        } catch (error) {
            console.error("Error deleting follow:", error);
        }
    }

  return (
    <>
        <HStack  w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <Link to={`/profile/${person.userName}`}>
                <HStack >
                    <Image
                        borderRadius='full'
                        boxSize='50px'
                        src={person.picture ? `${person.picture}` : 'https://i.imgur.com/uNL6B8O.png'}
                        alt='Dan Abramov'
                        border={'2px solid'}
                        borderColor={"whiteAlpha.600"}
                    />
                    <Heading ml={2} color="rgb(255, 255, 255)" size='sm'>{person.userName}</Heading>
                </HStack>
            </Link>
            <Button
                variant='ghost' 
                color='rgb(204, 206, 209)'
                size={"sm"}
                leftIcon={isFollowingPostAuthor ? <BsFillPersonCheckFill /> : <BsPlusLg />}
                onClick={() => {
                    if (isFollowingPostAuthor) {
                        handleDeleteFollowing(person._id);
                    } else {
                        handleAddFollowing(person._id);
                    }
                }}
                _hover={{
                    color: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(255, 255, 255)',
                }}
            >
                {isFollowingPostAuthor ? "Following" : "Follow"}
            </Button>
        </HStack>
        <Divider borderColor={"whiteAlpha.300"}/>
    </>
  )
}

export default PersonCard