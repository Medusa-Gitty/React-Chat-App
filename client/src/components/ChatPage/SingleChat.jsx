import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSender, getSenderFull } from "../../helpers/chatLogics";
import ProfileModal from "./ProfileModal";
import { chatSliceActions } from "../../redux/chatSlice";
import EditGroupChatModal from "./EditGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  //REDUX
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.userData);
  const { selectedChat } = useSelector((state) => state.chatData);

  const handleBack = () => {
    dispatch(chatSliceActions.setSelectedChat(null));
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={["28px", "30px"]}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              d={["flex", "none"]}
              icon={<ArrowBackIcon />}
              onClick={handleBack}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                  <Button>View User</Button>
                </ProfileModal>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <EditGroupChatModal
                  // fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Flex
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          ></Flex>
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
