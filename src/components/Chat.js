import React, { useEffect } from "react";
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import { db } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Message from "./Message";
import {useRef} from 'react'
function Chat() {
    const chatRef=useRef(null)
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages,loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  
//   console.log(roomDetails?.data());
//   console.log(roomMessages);
    useEffect(()=>{
        chatRef?.current?.scrollIntoView({
            behavior: "smooth"
        })
    },[roomId,loading])
  return (
    <ChatContainer>
        {roomMessages && roomDetails && ( <>
        <HeaderBar>
          <HeaderLeft>
            <h4>
              <strong>{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderIcon />
          </HeaderLeft>
          <HeaderRight>
            <p>
              <InfoIcon /> Details
            </p>
          </HeaderRight>
        </HeaderBar>
        <ChatMessages>
            {roomMessages?.docs.map(doc=>{
                const {message,timestamp,user,userImage}=doc.data()
                return (
                    <Message 
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                    />
                )
            })}
            <ChatBottom ref={chatRef} />
        </ChatMessages>
        <ChatInput chatRef={chatRef} channelName={roomDetails?.data().name} channelID={roomId} />
      </>)  }
     
    </ChatContainer>
  );
}
 
export default Chat;
const ChatMessages = styled.div``;

const ChatBottom=styled.div`
    padding:200px;
`

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
    color: red;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
