import React, { useCallback } from "react";
import styled from "styled-components";
import { User } from "../../interfaces";
import { Breakpoint } from "../../utils/breakpoint";
import { useAuthState } from "../auth/useAuthState";

const UserMenuContainer = styled.div`
  margin: 30px 0;
  padding: 0 30px;
  display: flex;
  flex-direction: column-reverse;
  column-gap: 10px;
  row-gap: 5px;
  @media only screen and ${Breakpoint.SM} {
    flex-direction: row-reverse;
  }
  & > div {
    text-align: right;
  }
`;

const UserBox = styled.div``;

const LogoutBox = styled.div``;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${(props) => props.theme.colors.accent};
  text-decoration: underline;
  cursor: pointer;
`;

const LoggedInUser: React.FC<{ user: User }> = ({ user }) => {
  const {
    actions: { clearUser },
  } = useAuthState();

  const logout = useCallback(() => {
    clearUser();
  }, [clearUser]);

  return (
    <>
      <LogoutBox>
        <LogoutButton onClick={logout}>logout</LogoutButton>
      </LogoutBox>
      <UserBox>{user.email}</UserBox>
    </>
  );
};

const LoggedOutUser = () => {
  return <></>;
};

export const UserMenu = () => {
  const { user } = useAuthState();

  return <UserMenuContainer>{user === null ? <LoggedOutUser /> : <LoggedInUser user={user} />}</UserMenuContainer>;
};
