import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const ref = useRef(null);
  const navigate = useNavigate();

  return (
    <form style={{ width: '100%' }}
        // onSubmit={(event) => {
        //   event.preventDefault();
        //   if (ref.current) {
        //     navigate(`/search/${ref.current.value}`);
        //     ref.current.value = "";
        //   }
        // }}
    >
      <InputGroup>
        {/* <InputLeftElement children={<BsSearch />} /> */}
        <Input
          
          ref={ref}
          borderRadius={100}
          placeholder="What's on your mind..."
          color={'whiteAlpha.800'}
          fontSize={'sm'}
          _placeholder={{ opacity: 1, color: 'whiteAlpha.500' }}
          backgroundColor={'blackAlpha.300'}
          borderColor={'whiteAlpha.500'}
          focusBorderColor='whiteAlpha.600'
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;