import {
  Avatar,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  useToast,
  Stack,
  Skeleton,
  Spinner,
  Box,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../helpers/localStorage";
import ProfileModal from "./ProfileModal";
import UserListItem from "../User/UserListItem";
import { debounce } from "lodash";
import axios from "axios";
import { chatSliceActions } from "../../redux/chatSlice";
import { userSliceActions } from "../../redux/userSlice";
import bg from "../../assets/images/bg6.jpg";

const SearchPanel = () => {
  //LOCAL States
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  //REDUX
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userData);
  const { chats } = useSelector((state) => state.chatData);
  //MISC
  const toast = useToast();
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    //Remove from Local Storage
    removeItem("userInfo");
    //remove from REDUX
    dispatch(userSliceActions.setUser(""));
  };

  //ALL USERS in DB Search with DEBOUNCING
  const handleSearch = debounce(async (text) => {
    try {
      setLoading(true);
      if (text === "") {
        setLoading(false);
        setSearchResult([]);
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${userData.token}` },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${text}`,
        config
      );
      setLoading(false);
      if (data.length === 0) {
        setSearchResult([]);
        toast({
          title: "WELP !",
          description: `No user found with name ${text}`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "No user found",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
    }
  }, 1000);

  //ACCESS THE CHAT and SAVE TO LS for CHATTING
  const accessChat = async (id) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId: id },
        config
      );
      if (!chats.find((chat) => chat._id === data._id)) {
        dispatch(chatSliceActions.setChats([data, ...chats]));
      }
      dispatch(chatSliceActions.setSelectedChat(data));
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p={3}
        bg="black"
      >
        <Button
          colorScheme="teal"
          variant="ghost"
          leftIcon={<SearchIcon />}
          ref={btnRef}
          onClick={onOpen}
        >
          <Text display={["none", "flex"]}>Search User</Text>
        </Button>
        <Text fontSize="2xl" color="white">
          Ping.gg
        </Text>
        <Flex>
          <Menu>
            <MenuButton as={Button} rightIcon={<BellIcon />}></MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>
          <Divider orientation="vertical" />
          <Menu>
            <MenuButton as={Button} borderRadius="5%">
              <Avatar size="sm" name={userData.name} src={userData.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={userData}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search for an user</DrawerHeader>

          <DrawerBody
            position="relative"
            display="inline-block"
            overflow="hidden"
            margin="0"
          >
            <Input
              placeholder="Type here..."
              onChange={(e) => handleSearch(e.target.value)}
              mb={5}
            />

            {loading ? (
              <Stack>
                <Skeleton height="50px" />
                <Skeleton height="50px" />
                <Skeleton height="50px" />
                <Skeleton height="50px" />
                <Skeleton height="50px" />
              </Stack>
            ) : (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  accessChatHandler={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && (
              <Spinner
                display="flex"
                m="auto"
                thickness="5px"
                speed="0.90s"
                emptyColor="gray.200"
                color="green.500"
                size="xl"
              />
            )}
            <Image
              src={bg}
              display="block"
              position="absolute"
              left="50%"
              bottom="0"
              min-height="100%"
              min-width="100%"
              transform="translate(-50%)"
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchPanel;
