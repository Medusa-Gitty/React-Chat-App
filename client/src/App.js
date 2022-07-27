import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { useSelector } from "react-redux";

function App() {
  const isAuth =
    useSelector((state) => state.userData.userData) === "" ? false : true;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuth ? <ChatPage /> : <HomePage />} />
        <Route
          path="/chats"
          element={isAuth ? <ChatPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
