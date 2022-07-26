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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../helpers/localStorage";
import ProfileModal from "./ProfileModal";
import UserListItem from "../User/UserListItem";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import { chatSliceActions } from "../../redux/chatSlice";

const SearchPanel = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const chats = useSelector((state) => state.chatData);

  const logoutHandler = () => {
    removeItem("userInfo");
    navigate("/");
  };

  //Debouncing
  const handleSearch = debounce(async (text) => {
    // setSearch(text);
    //Data fetch
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
      if (data.length === 0) {
        toast({
          title: "No user found",
          status: "warning",
          duration: 1000,
          isClosable: true,
        });
      }
      setLoading(false);
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

  async function accessChat(id) {
    try {
      setLoadingChat(true);
      const config = {
        "Content-type": "application/json",
        headers: { Authorization: `Bearer ${userData.token}` },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId: id },
        config
      );
      // if (!chats.find((chat) => chat._id === data._id)) {
      //   dispatch(chatSliceActions.setChats([data, ...chats]));
      // }
      dispatch(chatSliceActions.setSelectedChat(data));
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  return (
    <>
      <Flex
        justifyContent={"space-between"}
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
          <DrawerHeader>Search for a user</DrawerHeader>

          <DrawerBody>
            <Input
              placeholder="Type here..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            {loading ? (
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
            ) : (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  accessChatHandler={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchPanel;
