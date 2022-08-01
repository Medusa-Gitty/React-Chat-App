import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSender, getSenderFull } from "../../helpers/chatLogics";
import ProfileModal from "./ProfileModal";
import { chatSliceActions } from "../../redux/chatSlice";
import { notificationSliceActions } from "../../redux/notificationSlice";
import { fetchAgainSliceActions } from "../../redux/fetchAgainSlice";
import EditGroupChatModal from "./EditGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "lottie-react";
import typingAnimation from "../../assets/animatons/typing2.json";
import ping from "../../assets/images/ping.png";

// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "https://ping-chat-app-server.herokuapp.com/";
var socket;
var selectedChatCompare;

const SingleChat = () => {
  //REDUX
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.userData);
  const { selectedChat } = useSelector((state) => state.chatData);
  const notification = useSelector(
    (state) => state.notificationData.notificationData
  );
  //LOCAL STATES
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [roomId, setRoomId] = useState("");
  //MISC
  const toast = useToast();

  const handleBack = () => {
    dispatch(chatSliceActions.setSelectedChat(null));
  };

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
    socket.on("typing", (RoomId) => setRoomId(RoomId));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    if (selectedChat) {
      if (selectedChat._id === roomId) {
        setIsTyping(true);
        setRoomId("");
      }
    }
  }, [roomId, selectedChat]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        if (!notification.includes(newMessage)) {
          dispatch(
            notificationSliceActions.setNotification([
              newMessage,
              ...notification,
            ])
          );
          //SAVE NOTIFICATIONS TO LOCAL STORAGE
          localStorage.setItem(
            "notifications",
            JSON.stringify([newMessage, ...notification])
          );
          dispatch(fetchAgainSliceActions.setFetchAgain());
        }
      } else {
        setMessages([...messages, newMessage]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Flex
            fontSize={["25px", "30px"]}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              display={["flex", "none"]}
              isRound
              icon={<ArrowBackIcon />}
              onClick={handleBack}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                  <IconButton isRound icon={<InfoIcon w={6} h={6} />} />
                </ProfileModal>
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <EditGroupChatModal fetchMessages={fetchMessages} />
              </>
            )}
          </Flex>
          <Flex
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            style={{
              backgroundImage: `url(${require("../../assets/images/bg9.jpg")})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                display="flex"
                m="auto"
                thickness="7px"
                speed="0.90s"
                emptyColor="gray"
                color="green.500"
              />
            ) : (
              <Box className="scrollable">
                <ScrollableChat messages={messages} />
              </Box>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <Box>
                  <Lottie
                    animationData={typingAnimation}
                    loop={true}
                    style={{
                      width: "70px",
                    }}
                  />
                </Box>
              ) : (
                <></>
              )}
              <Flex gap={2}>
                <Input
                  variant="filled"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => {
                    sendMessage({ key: "Enter" });
                  }}
                >
                  Send
                </Button>
              </Flex>
            </FormControl>
          </Flex>
        </>
      ) : (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
          borderRadius="lg"
          style={{
            backgroundImage: `url(${require("../../assets/images/bg9.jpg")})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting !
          </Text>
          <Image src={ping} boxSize="200px" />
        </Flex>
      )}
    </>
  );
};

export default SingleChat;
