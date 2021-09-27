import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { db } from "../firebase";
import { useState } from "react";
import firebase from "firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function ChatInput({ channelName, channelID, chatRef }) {
  const [user] = useAuthState(auth);

  const [Input, setInput] = useState("");
  console.log(channelID);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelID) {
      return false;
    }
    db.collection("rooms").doc(channelID).collection("messages").add({
      message: Input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user?.photoURL,
    });
    chatRef.current.scrollIntoView({ behavior: "smooth" });
    setInput("");
  };        
  return (
    <ChatInputContainer>
      <form action="">
        <input
          type="text"
          name=""
          id=""
          value={Input}
          placeholder={`Message ${channelName}`}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="text"
          type="submit"
          color="default"
          hidden
          onClick={sendMessage}
        >
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid grey;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > Button {
    display: none;
  }
`;
