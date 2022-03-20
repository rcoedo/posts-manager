import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useFilter } from "./useFilter";

describe("useFilter", () => {
  test("sets empty string as default state", () => {
    const view = renderHook(() => useFilter());

    expect(view.result.current.filter).toEqual("");
  });

  test("returns a handler for filter change", async () => {
    const view = renderHook(() => useFilter());

    act(() => {
      view.result.current.handleFilterChange({ target: { value: "newValue" } });
    });

    expect(view.result.current.filter).toEqual("newValue");
  });
});
