import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatterBox = ({ fetchAgain, setFetchAgain }) => {
  //REDUX
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chatData);
  return (
    <Box
      display={[selectedChat ? "flex" : "none", "flex"]}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={["100%", "68%"]}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatterBox;
