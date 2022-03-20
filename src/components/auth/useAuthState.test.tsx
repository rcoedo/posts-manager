import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useAuthState, AuthContext } from "./useAuthState";

describe("useAuthState", () => {
  test("context has a default value", () => {
    const view = renderHook(() => useAuthState());

    expect(view.result.current).toMatchInlineSnapshot(`
      Object {
        "actions": Object {
          "clearUser": [Function],
          "loadUser": [Function],
        },
        "error": null,
        "isLoading": false,
        "user": null,
      }
    `);
  });

  test("returns the auth state stored in the context", () => {
    const state = {
      user: { name: "name", email: "email@email.com", token: "TOKEN" },
      error: null,
      isLoading: false,
      actions: {
        loadUser: jest.fn(),
        clearUser: jest.fn(),
      },
    };

    const view = renderHook(() => useAuthState(), {
      wrapper: ({ children }) => <AuthContext.Provider value={state}>{children}</AuthContext.Provider>,
    });

    expect(view.result.current).toMatchInlineSnapshot(`
      Object {
        "actions": Object {
          "clearUser": [MockFunction],
          "loadUser": [MockFunction],
        },
        "error": null,
        "isLoading": false,
        "user": Object {
          "email": "email@email.com",
          "name": "name",
          "token": "TOKEN",
        },
      }
    `);
  });
});
