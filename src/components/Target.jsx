import { VStack, Heading, Stack, Text, Divider, Box } from '@chakra-ui/react'
import {  motion, useAnimation  } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';


const Target = () => {
  const { ref: inViewRef, inView } = useInView();

  const mainControls = useAnimation()

  useEffect(() => {
    if (inView) {
      mainControls.start('visible')
      // console.log('in view')
    } 
  }, [inView]);

  return (
    <Stack  direction={['column', 'column', 'row']} mb={2}  gap={10} as={'section'} h={'max-content'} width={{xl: '100%', '2xl': '1400px'}} m='2rem auto 2px auto' p={'2rem 1rem'} justifyContent={'center'} position={'relative'}>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            color: 'white',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: { opacity: 1, scale: 1 }
            }}
            initial='hidden'
            transition={{ duration: .5, delay: .8}}
            animate={mainControls}
          >
            <Box ref={inViewRef} h='2px' w={{base: '200px', md: '330px'}} bgGradient={['linear(to-r, #1A1A1A, #FFF, #1A1A1A)']}></Box>
          </motion.div>
        </motion.div>
        <motion.div
          style={{
            flex: 1
          }}
          variants={{
            hidden: { opacity: 0, y: 70 },
            visible: { opacity: 1, y: 0 }
          }}
          initial='hidden'
          transition={{ duration: .5, delay: .8}}
          animate={mainControls}
        >
          <VStack alignItems={'flex-start'} flex={1} mt={{base: 0, md: 0}} >
            <Heading  fontWeight={'normal'} fontSize={['xl', '2xl', '3xl']} color="rgb(255, 255, 255)">Who is devConnect for?</Heading>
            <Heading  marginBottom={3} fontWeight={'normal'} fontSize={['xl', '2xl', '3xl']} color="rgb(105, 107, 111)">Developers of all backgrounds.</Heading>
            <Text fontSize={['md', 'lg']} color="rgb(255, 255, 255)">Graduates</Text>
            <Divider borderColor="rgb(123, 125, 128)" />
              <Text fontSize={['md', 'lg']} color="rgb(255, 255, 255)">Bootcamp students</Text>
            <Divider borderColor="rgb(123, 125, 128)" />
            <Text fontSize={['md', 'lg']} color="rgb(255, 255, 255)">Self-taught programmers</Text>
          </VStack>
        </motion.div>
        <motion.div
          style={{
            flex: 1
          }}
          variants={{
            hidden: { opacity: 0, y: 70 },
            visible: { opacity: 1, y: 0 }
          }}
          initial='hidden'
          transition={{ duration: .5, delay: .8}}
          animate={mainControls}
        >
          <VStack mb={7} h={'100%'} alignItems={'flex-start'}  flex={1}>
            <Text align={'center'} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={'.9rem'}>BUILD</Text>
            <Heading  marginBottom={3} fontWeight={'normal'} fontSize={['xl', '2xl', '3xl']} color="rgb(255, 255, 255)">Opportunity and Experience.</Heading>
            <Text fontSize={['md', 'lg']} color="rgb(123, 125, 128)">We get it – no matter how you found your way into the developer world, breaking in isn't always a breeze. With DevConnect, we're here to help you shine. Show off your skills, connect with others like you, and get the exposure you deserve in the industry.</Text>
          </VStack>
        </motion.div>
    </Stack>
  )
}

export default Target
