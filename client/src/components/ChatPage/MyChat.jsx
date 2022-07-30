import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSender, getSenderPic } from "../../helpers/chatLogics";
import { chatSliceActions } from "../../redux/chatSlice";
import GroupChatModal from "./GroupChatModal";
import "./styles.scss";

const MyChat = ({ fetchAgain }) => {
  //LOCAL STATE
  const [loggedUser, setLoggedUser] = useState();
  //REDUX
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.userData);
  const { chats, selectedChat } = useSelector((state) => state.chatData);
  //MISC
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      dispatch(chatSliceActions.setChats(data));
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    // setLoggedUser(getItem("userInfo"));
    setLoggedUser(user);
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={[selectedChat ? "none" : "flex", "flex"]}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={["100%", "31%"]}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex
        pb={3}
        px={3}
        fontSize={["25px", "30px"]}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={["15px", "17px"]}
            colorScheme="teal"
            variant="outline"
            rightIcon={<AddIcon />}
          >
            Create a party !
          </Button>
        </GroupChatModal>
      </Flex>
      <Flex
        style={{
          backgroundImage: `url(${require("../../assets/images/bg7.jpg")})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        flexDir="column"
        p={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" gap={1}>
            {chats.map((chat) => (
              <Flex direction="column" key={chat._id} gap={3}>
                <Flex gap={3}>
                  <Avatar
                    name={chat.chatName}
                    src={!chat.isGroupChat && getSenderPic(user, chat.users)}
                    border="3px solid #81C784"
                    p="2px"
                    backgroundColor="white"
                  />
                  <Box
                    onClick={() =>
                      dispatch(chatSliceActions.setSelectedChat(chat))
                    }
                    cursor="pointer"
                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    width="100%"
                  >
                    <Text fontSize="lg">
                      {!chat.isGroupChat
                        ? getSender(user, chat.users)
                        : chat.chatName}
                    </Text>
                  </Box>
                </Flex>
                <hr />
              </Flex>
            ))}
          </Stack>
        ) : (
          <Stack>
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
          </Stack>
        )}
      </Flex>
    </Box>
  );
};

export default MyChat;
