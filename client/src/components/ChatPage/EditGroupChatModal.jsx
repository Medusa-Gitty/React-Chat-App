import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Flex,
  FormControl,
  Input,
  Spinner,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import UserBadgeItem from "./../User/UserBadgeItem";
import axios from "axios";
import { chatSliceActions } from "../../redux/chatSlice";
import { fetchAgainSliceActions } from "../../redux/fetchAgainSlice";
import UserListItem from "../User/UserListItem";
import { SettingsIcon } from "@chakra-ui/icons";
import { debounce } from "lodash";

const EditGroupChatModal = ({ fetchMessages }) => {
  //LOCAL STATES
  const [groupChatName, setGroupChatName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  //REDUX
  const user = useSelector((state) => state.userData.userData);
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chatData);
  //MISC
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      dispatch(chatSliceActions.setSelectedChat(data));
      dispatch(fetchAgainSliceActions.setFetchAgain());
      setRenameLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = debounce(async (query) => {
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  }, 1000);

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
      dispatch(chatSliceActions.setSelectedChat(data));
      dispatch(fetchAgainSliceActions.setFetchAgain());
      setLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

      userToRemove._id === user._id
        ? dispatch(chatSliceActions.setSelectedChat(null))
        : dispatch(chatSliceActions.setSelectedChat(data));
      dispatch(fetchAgainSliceActions.setFetchAgain());
      fetchMessages();
      setLoading(false);
      toast({
        title: `${
          userToRemove.name === user.name
            ? "You left the Party"
            : userToRemove.name + " is removed from the party"
        }`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton isRound onClick={onOpen} icon={<SettingsIcon />} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent margin="20px">
          <ModalHeader
            fontSize="35px"
            display="flex"
            justifyContent="center"
            style={{
              backgroundImage: `url(${require("../../assets/images/bg12.jpg")})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            color="white"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Flex w="100%" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Flex>

            <FormControl display="flex">
              <Input
                placeholder="Change party name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="outline"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Text
              fontSize="sm"
              width="100%"
              color="red"
              fontStyle="italic"
              p={1}
            >
              Only Admins can add or remove members from a party !
            </Text>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  accessChatHandler={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleRemove(user)}
              colorScheme="red"
              variant="solid"
            >
              Leave Party
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditGroupChatModal;
