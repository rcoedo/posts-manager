import React from "react";
import { render, screen } from "@testing-library/react";
import { PostsPage } from "./PostsPage";
import * as useAppState from "../../state/useAppState";

jest.mock("react-router-dom", () => ({ Outlet: () => <div>outlet</div> }));
jest.mock("./Users", () => ({ Users: () => <div>users</div> }));
jest.mock("../../auth/WithAuth", () => {
  return {
    WithAuth: ({ children }: { children: React.ReactNode }) => <div data-testid="withauth">{children}</div>,
  };
});

const mockState = {
  posts: [],
  postsByUserId: {},
  usersByUserId: {},
  postsLoading: true,
  actions: {
    loadPosts: jest.fn(),
    clearPosts: jest.fn(),
  },
};

describe("PostsPage", () => {
  test("loads the posts", () => {
    const loadPosts = jest.fn(() => []);

    jest.spyOn(useAppState, "useAppState").mockReturnValue({ ...mockState, actions: { ...mockState.actions, loadPosts } });

    render(<PostsPage />);

    expect(loadPosts).toHaveBeenCalled();
  });

  test("renders loading if posts are loading", () => {
    jest.spyOn(useAppState, "useAppState").mockReturnValue(mockState);

    render(<PostsPage />);

    expect(screen.getByTestId("withauth")).toHaveTextContent("loading...");
  });

  test("renders the router outlet and users if posts are not loading", () => {
    jest.spyOn(useAppState, "useAppState").mockReturnValue({ ...mockState, postsLoading: false });

    render(<PostsPage />);

    expect(screen.getByText(/outlet/i)).toHaveTextContent("outlet");
    expect(screen.getByText(/users/i)).toHaveTextContent("users");
  });
});
