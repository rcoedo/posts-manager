import { AppContext } from "./useAppState";
import { usePosts } from "./usePosts";

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { actions: postsActions, ...postsState } = usePosts();
  return <AppContext.Provider value={{ ...postsState, actions: { ...postsActions } }}>{children}</AppContext.Provider>;
};
