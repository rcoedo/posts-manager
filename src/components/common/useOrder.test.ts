import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useOrder } from "./useOrder";

describe("useOrder", () => {
  test("sets empty string as default state", () => {
    const view = renderHook(() => useOrder<number>((x, y) => (x > y ? 1 : -1)));

    expect(view.result.current.compare(1, 2)).toEqual(1);
  });

  test("returns a callback to set state as Order.ASC", async () => {
    const view = renderHook(() => useOrder<number>((x, y) => (x > y ? 1 : -1)));

    act(() => {
      view.result.current.setOrderAsc();
    });

    expect(view.result.current.compare(1, 2)).toEqual(-1);
  });

  test("returns a callback to set state as Order.DESC", async () => {
    const view = renderHook(() => useOrder<number>((x, y) => (x > y ? 1 : -1)));

    act(() => {
      view.result.current.setOrderAsc();
    });

    expect(view.result.current.compare(1, 2)).toEqual(-1);

    act(() => {
      view.result.current.setOrderDesc();
    });

    expect(view.result.current.compare(1, 2)).toEqual(1);
  });
});
