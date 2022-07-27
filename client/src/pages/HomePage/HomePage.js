import React from "react";
import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../../components/Authentication/Login";
import SignUp from "../../components/Authentication/SignUp";
import "./homepage.scss";

const HomePage = () => {
  // const navigate = useNavigate();
  // const data = useSelector((state) => state.userData.userData);
  // useEffect(() => {
  //   if (data !== "") {
  //     navigate("/chats");
  //   }
  // }, [navigate, data]);

  return (
    <Container maxW="xl" centerContent>
      <Flex
        justifyContent="center"
        p={4}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="xl"
        borderWidth="5px"
        className="container"
      >
        <Text
          fontSize="4xl"
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
          bgClip="text"
          p={2}
          className="mainText"
        >
          PING.GG
        </Text>
      </Flex>
      <Box bg="white" w="100%" borderRadius="xl" borderWidth="5px" p={4}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
