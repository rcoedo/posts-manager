import React from "react";
import { render, screen } from "@testing-library/react";
import { WithAuth } from "./WithAuth";
import { AuthContext } from "./useAuthState";

jest.mock("react-router-dom", () => {
  return {
    Navigate: ({ to }: { to: string }) => <div>`Redirected to {to}`</div>,
    useLocation: () => "/",
  };
});

describe("WithAuth", () => {
  test("redirects if user is not set", () => {
    render(
      <WithAuth>
        <div>hey</div>
      </WithAuth>,
    );

    expect(screen.getByText(/Redirected/i)).toHaveTextContent("Redirected to /login");
  });

  test("does not redirect if user is set", () => {
    const state = {
      user: { name: "name", email: "email@email.com", token: "TOKEN" },
      error: null,
      isLoading: false,
      actions: {
        loadUser: jest.fn(),
        clearUser: jest.fn(),
      },
    };

    render(
      <WithAuth>
        <div>should be shown</div>
      </WithAuth>,
      {
        wrapper: ({ children }) => <AuthContext.Provider value={state}>{children}</AuthContext.Provider>,
      },
    );

    expect(screen.getByText(/shown/i)).toHaveTextContent("should be shown");
  });
});
