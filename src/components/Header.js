import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase'

function Header() {
  const [user]=useAuthState(auth)
  return (
    <HeaderContainer>
      {/* HeaderLeft  */}
      <HeaderLeft>
        <HeaderAvatar onClick={()=>auth.signOut()} src={user?.photoURL} />
        <AccessTimeIcon />
      </HeaderLeft>
      {/* HeaderMiddle */}
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search Here" />
      </HeaderSearch>
      {/* Header Right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  >.MuiSvgIcon-root{
    margin-left: auto;
    margin-right:20px;

  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  background-color: #421f44;
  opacity: 1;
  border-radius: 6px;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: grey;
  border: 1px solid grey;
  > input {
    background: transparent;
    border: none;
    outline: none;
    text-align: center;
    min-width: 30vw;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;
const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;