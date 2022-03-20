import { useCallback, useMemo, useState } from "react";
import { getPosts } from "../../api/mock";
import { SupermetricsPost, SupermetricsUser } from "../../interfaces";
import { noop } from "../../utils/js";

export interface PostsState {
  posts: SupermetricsPost[];
  postsByUserId: Record<string, SupermetricsPost[]>;
  usersByUserId: Record<string, SupermetricsUser>;
  postsLoading: boolean;
}

export interface PostsActions {
  loadPosts: () => void;
  clearPosts: () => void;
}

export const postsDefaultState = {
  posts: [],
  postsByUserId: {},
  usersByUserId: {},
  postsLoading: false,
  actions: {
    loadPosts: noop,
    clearPosts: noop,
  },
};

export const usePosts = () => {
  const [posts, setPosts] = useState<SupermetricsPost[]>([]);
  const [postsLoading, setPostsLoading] = useState<boolean>(false);

  const clearPosts = useCallback(() => {
    setPosts([]);
  }, [setPosts]);

  const loadPosts = useCallback(async () => {
    try {
      setPostsLoading(true);

      const result = await getPosts();

      setPosts(result.data.data.posts);
    } finally {
      setPostsLoading(false);
    }
  }, [setPosts, setPostsLoading]);

  const postsByUserId = useMemo(() => {
    return posts.reduce(
      (result: Record<string, SupermetricsPost[]>, post) => ({
        ...result,
        [post.from_id]: [...(result[post.from_id] || []), post],
      }),
      {},
    );
  }, [posts]);

  const usersByUserId = useMemo(() => {
    return posts.reduce(
      (result: Record<string, SupermetricsUser>, post) => ({
        ...result,
        [post.from_id]: { id: post.from_id, name: post.from_name },
      }),
      {},
    );
  }, [posts]);

  return { posts, postsLoading, postsByUserId, usersByUserId, actions: { loadPosts, clearPosts } };
};
