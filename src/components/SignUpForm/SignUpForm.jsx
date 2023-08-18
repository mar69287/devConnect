import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { Box, Button, Stack, Heading, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
      navigate('/');
    } catch {
      setFormData({ ...formData, error: 'Sign Up Failed - Try Again' });
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <Stack width={{ base: "100%", md: "75%" }} m="auto">
      <Box>
        <Stack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel color={'rgb(105, 107, 111)'}>Name</FormLabel>
            <Input color={'rgb(105, 107, 111)'} type="text" name="name" value={formData.name} onChange={handleChange} required />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel color={'rgb(105, 107, 111)'}>Email</FormLabel>
            <Input color={'rgb(105, 107, 111)'} type="email" name="email" value={formData.email} onChange={handleChange} required />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel color={'rgb(105, 107, 111)'}>Password</FormLabel>
            <Input color={'rgb(105, 107, 111)'} type="password" name="password" value={formData.password} onChange={handleChange} required />
          </FormControl >
          <FormControl id="confirm" isRequired>
            <FormLabel color={'rgb(105, 107, 111)'}>Confirm Password</FormLabel>
            <Input color={'rgb(105, 107, 111)'} type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          </FormControl>
          <Button _hover={{cursor: 'pointer', backgroundColor: 'rgb(26, 29, 35)', color: 'rgb(183, 184, 185)'}} transition='all 0.3s ease-in-out' backgroundColor={'rgb(255, 255, 255)'} borderRadius={50} background={'rgb(230, 137, 50)'} type="submit" onClick={handleSubmit}>
            Continue
          </Button>
          {formData.error && <Text color="red.500">{formData.error}</Text>}
        </Stack>
        <Stack color="rgb(255, 255, 255)" paddingTop={4} direction={{base: 'row'}} justifyContent={'center'} alignItems={'center'}>
          <Text>Already registered?{' '}</Text>
          <Link to={'/login'}>
            <Text as={'b'} _hover={{ bgGradient:'linear(to-l, #7928CA, #FF0080)'}}  bgGradient='linear(to-l, #FF0080, #7928CA)' cursor={'pointer'} bgClip='text' >Login</Text>
          </Link>
      </Stack>
      </Box>
    </Stack>
  );
}
