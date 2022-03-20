import React, { useContext } from "react";
import { PostsActions, PostsState, postsDefaultState } from "./usePosts";

export interface AppActions extends PostsActions {}

export interface AppState extends PostsState {
  actions: AppActions;
}

export const AppContext = React.createContext<AppState>({
  ...postsDefaultState,
  actions: {
    ...postsDefaultState.actions,
  },
});

export const useAppState = (): AppState => {
  const appContextState = useContext(AppContext);

  return appContextState;
};
