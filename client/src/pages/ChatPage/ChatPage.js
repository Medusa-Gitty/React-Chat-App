import React, { useEffect } from "react";
import { getItem } from "../../helpers/localStorage";
import { useSelector, useDispatch } from "react-redux";

const ChatPage = () => {
  let user = useSelector((state) => state.userData);
  console.log("data:", user);

  return <div></div>;
};

export default ChatPage;
