import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import SearchPanel from "../../components/ChatPage/SearchPanel";
import MyChat from "../../components/ChatPage/MyChat";
import ChatterBox from "../../components/ChatPage/ChatterBox";

const ChatPage = () => {
  return (
    <Box w="100%">
      <SearchPanel />
      <Flex justifyContent="space-between" w="100%" h="91.5vh" p={4}>
        <MyChat />
        <ChatterBox />
      </Flex>
    </Box>
  );
};

export default ChatPage;
