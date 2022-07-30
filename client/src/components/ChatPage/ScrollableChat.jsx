import { Avatar, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../helpers/chatLogics";
import { useSelector } from "react-redux";

const ScrollableChat = ({ messages }) => {
  const user = useSelector((state) => state.userData.userData);
  return (
    <>
      {messages &&
        messages.map((message, i) => (
          <Flex key={message._id}>
            {(isSameSender(messages, message, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                  src={message.sender.pic}
                />
              </Tooltip>
            )}
            <Text
              style={{
                backgroundColor: `${
                  message.sender._id === user._id ? "#B9F5D0" : "#CFD8DC"
                }`,
                marginLeft: isSameSenderMargin(messages, message, i, user._id),
                marginTop: isSameUser(messages, message, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {message.content}
            </Text>
          </Flex>
        ))}
    </>
  );
};

export default ScrollableChat;
