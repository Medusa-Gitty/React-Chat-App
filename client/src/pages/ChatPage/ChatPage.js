import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SearchPanel from "../../components/ChatPage/SearchPanel";
import MyChat from "../../components/ChatPage/MyChat";
import ChatterBox from "../../components/ChatPage/ChatterBox";

const ChatPage = () => {
  // const navigate = useNavigate();
  // const data = useSelector((state) => state.userData.userData);
  // useEffect(() => {
  //   if (data === "") {
  //     navigate("/");
  //   }
  // }, [navigate, data]);

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Box w="100%">
      <SearchPanel />
      <Flex justifyContent="space-between" w="100%" h="91.5vh" p={4}>
        <MyChat fetched={fetchAgain} />
        <ChatterBox fetched={fetchAgain} setFetchAgain={setFetchAgain} />
      </Flex>
    </Box>
  );
};

export default ChatPage;
