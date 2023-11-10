import { Box, HStack, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md'; 
import './NavBar.css';
import { motion } from "framer-motion";
import { AiOutlineArrowRight } from 'react-icons/ai'

const NonUserNavBar = () => {
  return (
    <Box w={'100%'} position={'fixed'} top={0} left={0} zIndex={3} backgroundColor={'rgb(15, 16, 19)'}>
      <HStack width={{lg: '100%', '2xl': '1400px'}} m='5px auto' justifyContent={'space-between'} p={'.9rem 1.8rem .9rem 1.4rem'}>
          <HStack>
              <Heading _hover={{cursor: 'pointer', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} as={'h1'} fontSize={{ base: '1.1rem', md: '1.3rem', lg: '1.5rem' }} color="rgb(255, 255, 255)" p={'.3rem .1rem'} borderColor={'rgb(255, 255, 255)'} borderBottom={'2px solid'} borderTop={'2px solid'} fontFamily="AquireBold">
                  devConnect
              </Heading>
          </HStack>
          <Link to='/login'>
              <motion.div
                style={{
                  padding: '.5rem 1.2rem',
                  backgroundColor: 'rgb(29, 33, 39)',
                  display: 'flex',
                  fontWeight: 500,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  position: 'relative',
                  overflow: 'hidden', 
                  gap: 5,
                  color: 'rgba(255, 255, 255, 0.5)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1
                }}
                whileHover={{
                  // scale: .95,
                  // background: 'linear-gradient(to left, #7928CA, #FF0080)',
                  // color: '#FFF',
                  // backgroundColor: 'rgb(26, 29, 40)',
                  color: 'rgba(255, 255, 255, 0.6)',
                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                }}
                whileTap={{
                  scale: .9,
                }}
                className="login-stack"
              >
                Login
              </motion.div>
            </Link> 
      </HStack>
    </Box>
  )
}

export default NonUserNavBar