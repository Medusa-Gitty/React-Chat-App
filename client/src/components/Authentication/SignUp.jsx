import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../redux/userSlice";

const SignUp = () => {
  //REDUX
  const dispatch = useDispatch();
  //LOCAL STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ text: "", show: false });
  const [confirmpassword, setConfirmpassword] = useState({
    text: "",
    show: false,
  });
  const [picLoading, setPicLoading] = useState(false);
  const [pic, setPic] = useState();
  //MISC
  const toast = useToast();
  // const navigate = useNavigate();

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

  function postDetails(pics) {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dejuqnyhm");
      fetch("https://api.cloudinary.com/v1_1/dejuqnyhm/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  }

  async function submitHandler() {
    setPicLoading(true);
    if (!name || !email || !password.text || !confirmpassword.text) {
      toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password.text !== confirmpassword.text) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password: password.text,
          pic,
        },
        config
      );
      toast({
        title: "Account created.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      //Save in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      //Save in REDUX
      dispatch(userSliceActions.setUser(data));
      setPicLoading(false);
    } catch (err) {
      toast({
        title: "Error!",
        description: err.response.data.message,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  }

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
        <FormLabel>Password {password.show ? "😲" : "🙄"}</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={password.show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword({ ...password, text: e.target.value })}
            fontFamily={"heading"}
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

      <FormControl id="passwordConfirm" isRequired>
        <FormLabel>
          Confirm Password {confirmpassword.show ? "😲" : "🙄"}
        </FormLabel>
        <InputGroup size="md">
          <Input
            type={confirmpassword.show ? "text" : "password"}
            placeholder="Confirm your password"
            onChange={(e) =>
              setConfirmpassword({ ...confirmpassword, text: e.target.value })
            }
            fontFamily={"heading"}
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
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
