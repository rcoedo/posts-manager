import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useAppState, AppContext } from "./useAppState";

describe("useAppState", () => {
  test("context has a default value", () => {
    const view = renderHook(() => useAppState());

    expect(view.result.current).toMatchInlineSnapshot(`
      Object {
        "actions": Object {
          "clearPosts": [Function],
          "loadPosts": [Function],
        },
        "posts": Array [],
        "postsByUserId": Object {},
        "postsLoading": false,
        "usersByUserId": Object {},
      }
    `);
  });

  test("returns the app state stored in the context", () => {
    const state = {
      posts: [],
      postsByUserId: {},
      usersByUserId: {},
      postsLoading: true,
      actions: {
        loadPosts: jest.fn(),
        clearPosts: jest.fn(),
      },
    };

    const view = renderHook(() => useAppState(), {
      wrapper: ({ children }) => <AppContext.Provider value={state}>{children}</AppContext.Provider>,
    });

    expect(view.result.current).toMatchInlineSnapshot(`
      Object {
        "actions": Object {
          "clearPosts": [MockFunction],
          "loadPosts": [MockFunction],
        },
        "posts": Array [],
        "postsByUserId": Object {},
        "postsLoading": true,
        "usersByUserId": Object {},
      }
    `);
  });
});
