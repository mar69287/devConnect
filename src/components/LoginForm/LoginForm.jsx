import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';
import { Link } from "react-router-dom";
import { FormControl, FormLabel, Input, Button, Text, VStack, Center, Stack } from "@chakra-ui/react";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/feed');
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <Stack width={{ base: "100%", md: "75%" }} m="auto">
      <VStack spacing={4}>
        <FormControl id="email" isRequired>
          <FormLabel color={'rgb(105, 107, 111)'}>Email</FormLabel>
          <Input color={'rgb(105, 107, 111)'} type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel color={'rgb(105, 107, 111)'}>Password</FormLabel>
          <Input color={'rgb(105, 107, 111)'} type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </FormControl>
        <Button _hover={{cursor: 'pointer', backgroundColor: 'rgb(26, 29, 35)', color: 'rgb(183, 184, 185)'}} transition='all 0.3s ease-in-out' backgroundColor={'rgb(255, 255, 255)'} borderRadius={50} background={'rgb(230, 137, 50)'} type="submit" onClick={handleSubmit}>
          Continue
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
      <Stack color="rgb(255, 255, 255)" paddingTop={4} direction={{base: 'column', lg: 'row'}} justifyContent={'center'} alignItems={'center'}>
          <Text textAlign={'center'}>New to devConnect?{' '}</Text>
          <Link to={'/signup'}>
            <Text as={'b'} textAlign={'center'} _hover={{ bgGradient:'linear(to-l, #7928CA, #FF0080)'}}  bgGradient='linear(to-l, #FF0080, #7928CA)' cursor={'pointer'} bgClip='text' >Create your account</Text>
          </Link>
      </Stack>
      <Center>
        <Text textAlign={'center'} color="rgb(255, 255, 255)">(Demo: email: user@user.com password: user)</Text>
      </Center>
    </Stack>
  );
}