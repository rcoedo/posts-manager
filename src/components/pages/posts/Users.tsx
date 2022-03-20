import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { SupermetricsUser } from "../../../interfaces";
import { useFilter } from "../../common/useFilter";
import { useAppState } from "../../state/useAppState";

const UsersContainer = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;

const UsersControls = styled.div``;

const UsersSearchInput = styled.input`
  width: 100%;
  height: 20px;
`;

const UserList = styled.ul``;

const UserListItem = styled.li`
  display: block;
  margin-bottom: 10px;
`;

const UserCard = styled.div<{ selected: boolean }>`
  display: flex;
  gap: 10px;
  padding: 0.75rem;
  border: 2px solid;
  border-radius: 5px;
  color: black;

  ${(props) =>
    props.selected
      ? `
    background-color: ${props.theme.colors.gray};
    box-shadow: 4px 4px 0px -1px ${props.theme.colors.accent};
    `
      : ""}

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.focusBg};
    box-shadow: 4px 4px 0px -1px ${(props) => props.theme.colors.accent};
  }
`;

const UserNameContainer = styled.div`
  width: 100%;
`;

const PostCountContainer = styled.div`
  text-align: center;
`;

const PostCount = styled.span`
  display: block;
  border-radius: 50px;
  color: white;
  background: ${(props) => props.theme.colors.red};
  width: 20px;
`;

const compareUsers = (user1: SupermetricsUser, user2: SupermetricsUser) => {
  return user1.name > user2.name ? 1 : -1;
};

export const Users = () => {
  const { userId } = useParams();
  const { usersByUserId, postsByUserId } = useAppState();
  const { filter, handleFilterChange } = useFilter();

  const users = useMemo(
    () =>
      Object.values(usersByUserId)
        .filter((user) => user.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
        .sort(compareUsers),
    [usersByUserId, filter],
  );

  return (
    <UsersContainer>
      <UsersControls>
        <UsersSearchInput type="text" value={filter} onChange={handleFilterChange} placeholder="filter users..." />
      </UsersControls>
      <UserList>
        {users.map((user) => (
          <UserListItem key={user.id}>
            <Link to={`/posts/${user.id}`} style={{ display: "block", textDecoration: "none" }}>
              <UserCard selected={userId === user.id}>
                <UserNameContainer>{user.name}</UserNameContainer>
                <PostCountContainer>
                  <PostCount>{postsByUserId[user.id]?.length || 0}</PostCount>
                </PostCountContainer>
              </UserCard>
            </Link>
          </UserListItem>
        ))}
      </UserList>
    </UsersContainer>
  );
};
