import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from 'react-icons/md';
import '../../components/NavBar/NavBar.css'

const Hero = () => {
  const renderEmptyIndicator = () => <div></div>;
  return (
    <Box className="hero" minH="100vh" m='0 auto' display="flex" justifyContent={"center"} alignItems="center" p={'70px 1rem 0 1rem'} width={{xl: '100%', '2xl': '1400px'}}>
      <VStack >
        <Heading align={'center'}  fontWeight={'normal'} fontSize={['2xl', '3xl', '4xl']} color="rgb(255, 255, 255)">Empowering Developers in the Digital Era.</Heading>
        <Heading align={'center'} marginBottom={3} fontWeight={'normal'} fontSize={['2xl', '3xl', '4xl']} color="rgb(105, 107, 111)">Networking and Collaborating on Your Own Terms.</Heading>
        <Link to='/auth'>
            <HStack marginBottom={3} className="login-stack" _hover={{cursor: 'pointer', backgroundColor: 'rgb(26, 29, 35)', color: 'rgb(183, 184, 185)', transition: 'all 0.3s ease-in-out'}} gap={0}  p={'.5rem 1.2rem'} backgroundColor={'rgb(255, 255, 255)'} borderRadius={50}>
              <Text>Join Us</Text>
              <MdKeyboardArrowRight className="arrow-icon"/>
            </HStack>
        </Link>
        <Text align={'center'} color={'rgb(123, 125, 128)'} fontSize={'1.1rem'}>devConnect fuels your growth by channeling <br />your coding skills into meaningful</Text>
        <Carousel width={'20rem'} infiniteLoop showArrows={false} autoPlay interval={5000} showStatus={false}  renderIndicator={renderEmptyIndicator}>
            <Box><Text align={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.1rem'}>Connections</Text></Box>
            <Box><Text align={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.1rem'}>Collabortive projects</Text></Box>
            <Box><Text align={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.1rem'}>Career-enhancing opportunities</Text></Box>
        </Carousel>
      </VStack>
    </Box>
  )
}

export default Hero