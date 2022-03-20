import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Breakpoint } from "../../../utils/breakpoint";
import { WithAuth } from "../../auth/WithAuth";
import { useAppState } from "../../state/useAppState";
import { Users } from "./Users";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and ${Breakpoint.SM} {
    flex-direction: row;
  }
  column-gap: 20px;
`;

const UsersBox = styled.div`
  flex: 1 1 0;
  width: 100%;
`;

const PostsBox = styled.div`
  flex: 3 1 0;
  width: 100%;
`;

export const PostsPage = () => {
  const {
    postsLoading,
    actions: { loadPosts },
  } = useAppState();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <WithAuth>
      {postsLoading ? (
        <>loading...</>
      ) : (
        <PostsContainer>
          <UsersBox>
            <Users />
          </UsersBox>
          <PostsBox>
            <Outlet />
          </PostsBox>
        </PostsContainer>
      )}
    </WithAuth>
  );
};
