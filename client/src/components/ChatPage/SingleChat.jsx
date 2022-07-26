import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../../helpers/chatLogics";

const SingleChat = () => {
  //REDUX
  const user = useSelector((state) => state.userData);
  const { selectedChat } = useSelector((state) => state.chatData);

  const setSelectedChat = () => {};

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat.users)}</>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {/* <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                /> */}
              </>
            )}
          </Text>
        </>
      ) : (
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Flex>
      )}
    </>
  );
};

export default SingleChat;
