import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useAuth } from "./useAuth";

jest.mock("../../api/api", () => ({
  register: () =>
    Promise.resolve({
      data: {
        data: {
          client_id: "client_id",
          email: "email@email.com",
          sl_token: "TOKEN",
        },
      },
    }),
}));

describe("useAuth", () => {
  test("returns an initial user", () => {
    const view = renderHook(() => useAuth());

    expect(view.result.current.user).toEqual(null);
    expect(view.result.current.error).toEqual(null);
    expect(view.result.current.isLoading).toEqual(false);
  });

  test("loadUser loads the user", async () => {
    const view = renderHook(() => useAuth());

    expect(view.result.current.user).toEqual(null);
    expect(view.result.current.isLoading).toEqual(false);

    const onSuccess = jest.fn();
    await act(() => view.result.current.actions.loadUser("name", "email@email.com", onSuccess));

    expect(onSuccess).toHaveBeenCalled();
    expect(view.result.current.isLoading).toEqual(false);
    expect(view.result.current.user).toEqual({
      email: "email@email.com",
      name: "name",
      token: "TOKEN",
    });
  });

  test("clearUser clears the user", async () => {
    const view = renderHook(() => useAuth());

    const onSuccess = jest.fn();
    await act(() => view.result.current.actions.loadUser("name", "email@email.com", onSuccess));

    expect(view.result.current.user?.name).toEqual("name");

    act(() => view.result.current.actions.clearUser());

    expect(view.result.current.user).toEqual(null);
  });
});
