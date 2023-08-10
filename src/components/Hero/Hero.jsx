import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Hero = () => {
  const renderEmptyIndicator = () => <div></div>;
  return (
    <Box minH="100vh" m='0 auto' display="flex" justifyContent={"center"} alignItems="center" p={'0 1rem'} width={{xl: '100%', '2xl': '1400px'}}>
      <VStack >
        <Heading align={'center'}  fontWeight={'normal'} fontSize={['2xl', '3xl', '4xl']} color="rgb(255, 255, 255)">Empowering Developers in the Digital Era.</Heading>
        <Heading align={'center'} marginBottom={3} fontWeight={'normal'} fontSize={['2xl', '3xl', '4xl']} color="rgb(105, 107, 111)">Networking and Collaborating on Your Own Terms.</Heading>
        <Text align={'center'} color={'rgb(123, 125, 128)'} fontSize={'1.1rem'}>devConnect fuels your growth by channeling <br />your coding skills into meaningful</Text>
        <Carousel infiniteLoop showArrows={false} autoPlay interval={5000} showStatus={false} showThumbs={false} renderIndicator={renderEmptyIndicator}>
            <Box><Text align={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.1rem'}>Connections</Text></Box>
            <Box><Text align={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.1rem'}>Collabortive projects</Text></Box>
            <Box><Text align={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'1.1rem'}>Career-enhancing opportunities</Text></Box>
        </Carousel>
      </VStack>
    </Box>
  )
}

export default Hero