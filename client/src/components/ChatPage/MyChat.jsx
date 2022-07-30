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
import { getItem } from "../../helpers/localStorage";
import GroupChatModal from "./GroupChatModal";

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

  console.log(chats);

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
        fontSize={["28px", "30px"]}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={["17px", "10px", "17px"]}
            rightIcon={<AddIcon />}
          >
            Create a party !
          </Button>
        </GroupChatModal>
      </Flex>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Flex direction="column" key={chat._id} gap={2}>
                <Flex gap={3}>
                  <Avatar
                    name={chat.chatName}
                    src={!chat.isGroupChat && getSenderPic(user, chat.users)}
                    border="2px solid #4CAF50"
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
      </Box>
    </Box>
  );
};

export default MyChat;
