import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react"
import Hero from "../components/Hero/Hero"
import NonUserNavBar from "../components/NavBar/NonUserNavBar"
import Target from "../components/Target"

const HomePage = () => {
  return (
    <>
      <NonUserNavBar />
      <Hero />
      <Target />
    </>
  )
}

export default HomePage