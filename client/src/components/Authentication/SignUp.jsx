import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const SignUp = () => {
  return (
    <VStack>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter your name" />
      </FormControl>
    </VStack>
  );
};

export default SignUp;
