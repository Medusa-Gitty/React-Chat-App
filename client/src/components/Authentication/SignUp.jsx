import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { userSignUpActions } from "../../redux/userSignUpSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ text: "", show: false });
  const [confirmpassword, setConfirmpassword] = useState({
    text: "",
    show: false,
  });
  const [pic, setPic] = useState("");

  function handleClick() {
    setPassword((prev) => {
      return { ...prev, show: !prev.show };
    });
  }
  function handleClickConfirm() {
    setConfirmpassword((prev) => {
      return { ...prev, show: !prev.show };
    });
  }

  function postDetails(pics) {}

  function submitHandler() {}

  return (
    <VStack>
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={password.show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword({ ...password, text: e.target.value })}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              disabled={password.text === ""}
            >
              {password.show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={confirmpassword.show ? "text" : "password"}
            placeholder="Confirm your password"
            onChange={(e) =>
              setConfirmpassword({ ...confirmpassword, text: e.target.value })
            }
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClickConfirm}
              disabled={confirmpassword.text === ""}
            >
              {confirmpassword.show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="linkedin"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
