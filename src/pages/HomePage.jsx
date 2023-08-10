import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react"
import Hero from "../components/Hero/Hero"
import NonUserNavBar from "../components/NavBar/NonUserNavBar"

const HomePage = () => {
  return (
    <>
      <NonUserNavBar />
      <Hero />
    </>
  )
}

export default HomePage