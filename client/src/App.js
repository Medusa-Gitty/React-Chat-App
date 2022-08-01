import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { useSelector } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";

function App() {
  const isAuth =
    useSelector((state) => state.userData.userData) === "" ? false : true;

  return (
    <Flex direction="column" className="App" justifyContent="space-between">
      <Box>
        <Routes>
          <Route path="/" element={isAuth ? <ChatPage /> : <HomePage />} />
          <Route
            path="/chats"
            element={isAuth ? <ChatPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Box>
      <Box align="center" bg="white">
        Made with ❤️ by Sayak
      </Box>
    </Flex>
  );
}

export default App;
