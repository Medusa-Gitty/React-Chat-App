import {
  Avatar,
  Button,
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
  Image,
  Badge,
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
import { notificationSliceActions } from "../../redux/notificationSlice";
import bg from "../../assets/images/bg6.jpg";
import { getSender } from "../../helpers/chatLogics";
import {
  notificationHelper,
  notificationFreq,
} from "../../helpers/notificationHelper";
import noResultsAnimation from "../../assets/animatons/noResults.json";
import Lottie from "lottie-react";

const SearchPanel = () => {
  //LOCAL States
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //REDUX
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userData);
  const { chats } = useSelector((state) => state.chatData);
  const notification = useSelector(
    (state) => state.notificationData.notificationData
  );
  //MISC
  const toast = useToast();
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    removeItem("userInfo");
    removeItem("notifications");
    dispatch(userSliceActions.setUser(""));
  };

  const openChatFromNotification = (n) => {
    dispatch(chatSliceActions.setSelectedChat(n.chat));
    const filteredNotifications = notification.filter(
      (notif) => notif.chat._id !== n.chat._id
    );
    //SAVE NEW NOTIFICATIONS TO REDUX
    dispatch(notificationSliceActions.setNotification(filteredNotifications));
    //SAVE NEW NOTIFICATIONS TO LS
    localStorage.setItem(
      "notifications",
      JSON.stringify(filteredNotifications)
    );
  };

  //ALL USERS in DB Search with DEBOUNCING
  const handleSearch = debounce(async (text) => {
    setSearchQuery(text);
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
      const { data } = await axios.get(`/api/user?search=${text}`, config);
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
      const { data } = await axios.post(`/api/chat`, { userId: id }, config);
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
        p="6px"
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
            <MenuButton p={1}>
              {notification.length && (
                <Badge ml="1" colorScheme="green">
                  {notificationFreq(notification)}
                </Badge>
              )}
              <BellIcon fontSize="2xl" m={1} color="white" />
            </MenuButton>
            <MenuList pl={3}>
              {!notification.length && "No new messages"}
              {notificationHelper(notification).map((n) => (
                <MenuItem
                  key={n.data._id}
                  onClick={() => openChatFromNotification(n.data)}
                  pr={5}
                >
                  {n.data.chat.isGroupChat
                    ? `New message in : ${n.data.chat.chatName}`
                    : `New message from - ${getSender(
                        userData,
                        n.data.chat.users
                      )}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="black">
              <Avatar
                size="sm"
                cursor="pointer"
                name={userData.name}
                src={userData.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={userData}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler} color="red">
                Logout
              </MenuItem>
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
            {!loading && searchResult.length === 0 && searchQuery !== "" && (
              <>
                <Text width="100%" align="center" color="red">
                  No results found for : {searchQuery}
                </Text>
                <Lottie animationData={noResultsAnimation} loop={true} />
              </>
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
