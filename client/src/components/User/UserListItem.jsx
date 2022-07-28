import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = (props) => {
  let user = props.user;
  return (
    <Box
      onClick={props.accessChatHandler}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Flex alignItems="center">
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.pic}
        />
        <Text fontWeight="bold">{user.name}</Text>
      </Flex>
      <Text fontSize="sm">
        <b>Email : </b>
        {user.email}
      </Text>
    </Box>
  );
};

export default UserListItem;
