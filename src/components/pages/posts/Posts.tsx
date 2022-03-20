import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SupermetricsPost } from "../../../interfaces";
import { Breakpoint } from "../../../utils/breakpoint";
import { useFilter } from "../../common/useFilter";
import { useOrder } from "../../common/useOrder";
import { useAppState } from "../../state/useAppState";

const PostsContainer = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;

const PostsControls = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
`;

const PostsSearchInput = styled.input`
  height: 20px;
  width: 100%;

  @media only screen and ${Breakpoint.XLG} {
    width: 40%;
  }
`;

const SortButton = styled.button`
  font-size: 18px;
  background: none;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  width: 40px;
`;

const PostList = styled.ul``;

const PostListItem = styled.li`
  display: block;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const PostCard = styled.div`
  border: 2px solid;
  border-radius: 5px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.focusBg};
    box-shadow: 4px 4px 0px -1px ${(props) => props.theme.colors.accent};
  }

  & div {
    padding: 0.5rem;
  }
`;

const DateContainer = styled.div`
  border-bottom: 2px solid black;
`;

const MessageContainer = styled.div`
  text-align: justify;
`;

const comparePosts = (post1: SupermetricsPost, post2: SupermetricsPost) => {
  return post1.created_time > post2.created_time ? 1 : -1;
};

const NoUser = () => <div>user does not exist</div>;
const NoPosts = () => <div>no matching results</div>;

export const Posts = () => {
  const { userId } = useParams();
  const { postsByUserId } = useAppState();
  const { compare, setOrderAsc, setOrderDesc } = useOrder(comparePosts);
  const { filter, handleFilterChange } = useFilter();

  const sortedPosts = useMemo(() => {
    const posts = (userId && postsByUserId[userId]) || [];
    return posts.filter((post) => post.message.includes(filter)).sort(compare);
  }, [compare, userId, postsByUserId, filter]);

  if (!userId) {
    return <NoUser />;
  }

  return (
    <PostsContainer>
      <PostsControls>
        <SortButton onClick={setOrderDesc}>▼</SortButton>
        <SortButton onClick={setOrderAsc}>▲</SortButton>
        <PostsSearchInput type="text" value={filter} onChange={handleFilterChange} placeholder="filter posts..." />
      </PostsControls>
      <PostList>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <PostListItem key={post.id}>
              <PostCard>
                <DateContainer>{new Date(post.created_time).toLocaleString()}</DateContainer>
                <MessageContainer>{post.message}</MessageContainer>
              </PostCard>
            </PostListItem>
          ))
        ) : (
          <NoPosts />
        )}
      </PostList>
    </PostsContainer>
  );
};
