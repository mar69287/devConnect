import { Card, Heading, Image, VStack, Button } from "@chakra-ui/react"
import { motion } from "framer-motion";
import { deleteFollowing, addFollowing } from "../utilities/profiles-api";
import { useState } from "react";

const NetworkCard = ({ person, followingComponent, setFollowing, setFollowingCount, profile, following }) => {
    const [isFollowingUser, setIsFollowingUser] = useState(following.some((followedProfile) => followedProfile._id === person._id));

    const handleDeleteFollowing = async (followerId) => {
        try {
            await deleteFollowing(profile._id, followerId);
            setFollowing((prevFollowing) => prevFollowing.filter((profile) => profile._id !== followerId));
            setFollowingCount((prevTotal) => prevTotal - 1);
        } catch (error) {
            console.error("Error deleting follow:", error);
        }
    }

    const handleAddFollower = async (followerId) => {
        try {
            const newFollowing = await addFollowing(profile._id, followerId);
            setFollowing((prev) => [...prev, newFollowing]);
            setFollowingCount((prevTotal) => prevTotal + 1);
            setIsFollowingUser(true)
        } catch (error) {
            console.error("Error adding follow:", error);
        }
    }

    const handleDeleteFollower = async (followerId) => {
        try {
            await deleteFollowing(profile._id, followerId);
            setFollowing((prevFollowing) => prevFollowing.filter((profile) => profile._id !== followerId));
            setFollowingCount((prevTotal) => prevTotal - 1);
            setIsFollowingUser(false)
        } catch (error) {
            console.error("Error deleting follow:", error);
        }
    }

  return (
    <Card bgGradient='linear(to-l, #1A1A1A, #FFF, #1A1A1A)' py={'.5px'} h={'15rem'} w={'13rem'} borderRadius={3} border={'1px solid #1A1A1A'} _hover={{paddingY: '1px'}}>
        <VStack w={'100%'} h={'100%'} bg={'rgb(15, 16, 19)'} justifyContent={'center'} gap={3}>
            <Image
                borderRadius='full'
                boxSize='50px'
                src={person.picture ? `${person.picture}` : 'https://i.imgur.com/uNL6B8O.png'}
                alt='Dan Abramov'
                border={'2px solid'}
                borderColor={"whiteAlpha.600"}
            />
            <Heading align={'center'}  fontWeight={'normal'} fontSize={['sm', 'md', 'lg']} color="rgb(255, 255, 255)">{person.userName}</Heading>
            {followingComponent ? (
                <motion.div
                    style={{
                      padding: '.5rem 1rem',
                      backgroundColor: '#FFF',
                      display: 'flex',
                      fontWeight: 500,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      position: 'relative',
                      overflow: 'hidden', 
                      gap: 5
                    }}
                    whileHover={{
                      scale: 1.02,
                      background: 'linear-gradient(to right, #7928CA, #FF0080)',
                      color: '#FFF',
                      cursor: 'pointer'
                    }}
                    whileTap={{
                      scale: .9,
                    }}
                    onClick={() => handleDeleteFollowing(person._id)}
                  >
                    Unfollow
                  </motion.div>
            ) : (
                <motion.div
                style={{
                  padding: '.5rem 1rem',
                  backgroundColor: '#FFF',
                  display: 'flex',
                  fontWeight: 500,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  position: 'relative',
                  overflow: 'hidden', 
                  gap: 5
                }}
                whileHover={{
                  scale: 1.02,
                  background: 'linear-gradient(to right, #7928CA, #FF0080)',
                  color: '#FFF',
                  cursor: 'pointer'
                }}
                whileTap={{
                  scale: .9,
                }}
                onClick={() => {
                    if (isFollowingUser) {
                        handleDeleteFollower(person._id);
                    } else {
                        handleAddFollower(person._id);
                    }
                }}
              >
                {isFollowingUser ? "Following" : "Follow"}
              </motion.div>
            )}
            {/* <Button bgColor={'#FFF'} fontWeight={500}>
                Unfollow
            </Button> */}
            
        </VStack>
    </Card>
    // <Card bgGradient='linear(to-l, #1A1A1A, #FFF, #1A1A1A)' pb={'.5px'} h={'12rem'} w={'10rem'} key={person._id} borderRadius={3} border={'1px solid #1A1A1A'} _hover={{paddingBottom: '1px'}}>
    //     <Box w={'100%'} h={'100%'} bg={'rgb(15, 16, 19)'} >

    //     </Box>
    // </Card>
  )
}

export default NetworkCard