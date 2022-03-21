import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { usePosts } from "./usePosts";

jest.mock("../auth/useAuthState", () => ({
  useAuthState: () => ({ user: { name: "name", email: "email", token: "token" } }),
}));

jest.mock("../../api/api", () => ({
  getPosts: () =>
    Promise.resolve({
      data: {
        data: {
          posts: [
            {
              id: "post6233751a8fe90_9ff280f8",
              from_name: "Quyen Pellegrini",
              from_id: "user_19",
              message:
                "offense herd pool egg white use ton constitution pick accumulation addition option recovery stake toss inn fabricate landowner route mother section sacrifice appreciate leak admit evolution foreigner grudge bother color speculate litigation excavation terminal set traction sympathetic swell terrify aspect smoke theft climate establish recommendation rank adventure rider bottom pick tell revoke precede oak forget sulphur indulge seem recovery climb linen spend interface extraterrestrial variant trick house tin merchant thick humanity mail secretion run",
              type: "status",
              created_time: "2022-03-17T12:06:30+00:00",
            },
            {
              id: "post6233751a8feb6_c34fdbaa",
              from_name: "Quyen Pellegrini",
              from_id: "user_19",
              message:
                "boy prisoner retiree rocket belly parachute biology braid murder prevent trace toss achievement opposite manufacture",
              type: "status",
              created_time: "2022-03-17T08:48:09+00:00",
            },
            {
              id: "post6233751a8febf_9c125548",
              from_name: "Gigi Richter",
              from_id: "user_7",
              message:
                "calculation genuine visible wisecrack far tribe improve water twist hiccup instrument tenant torture helmet fuss ecstasy excavation palm field stunning snack morsel food housing building abundant trade pattern birthday mirror mail rescue canvas state donor rage space dignity snub save quotation connection silver secretion angel dare due space window delay old feature psychology scholar water trait discourage knock team failure clinic rough lift era delicate pedestrian retirement candle fine leader facility toss omission gradient ignite formal fund find swell favor breast memorandum dragon coach route reckless possibility Europe knock host project miscarriage advice flow scandal withdrawal appear permission insert gravel",
              type: "status",
              created_time: "2022-03-17T05:04:37+00:00",
            },
          ],
        },
      },
    }),
}));

describe("usePosts", () => {
  test("returns an initial post list", () => {
    const view = renderHook(() => usePosts());

    expect(view.result.current.posts).toEqual([]);
  });

  test("loadPosts loads the posts", async () => {
    const view = renderHook(() => usePosts());

    expect(view.result.current.posts).toEqual([]);
    expect(view.result.current.postsLoading).toEqual(false);

    await act(() => view.result.current.actions.loadPosts());

    expect(view.result.current.postsLoading).toEqual(false);
    expect(view.result.current.posts).toMatchInlineSnapshot(`
        Array [
          Object {
            "created_time": "2022-03-17T12:06:30+00:00",
            "from_id": "user_19",
            "from_name": "Quyen Pellegrini",
            "id": "post6233751a8fe90_9ff280f8",
            "message": "offense herd pool egg white use ton constitution pick accumulation addition option recovery stake toss inn fabricate landowner route mother section sacrifice appreciate leak admit evolution foreigner grudge bother color speculate litigation excavation terminal set traction sympathetic swell terrify aspect smoke theft climate establish recommendation rank adventure rider bottom pick tell revoke precede oak forget sulphur indulge seem recovery climb linen spend interface extraterrestrial variant trick house tin merchant thick humanity mail secretion run",
            "type": "status",
          },
          Object {
            "created_time": "2022-03-17T08:48:09+00:00",
            "from_id": "user_19",
            "from_name": "Quyen Pellegrini",
            "id": "post6233751a8feb6_c34fdbaa",
            "message": "boy prisoner retiree rocket belly parachute biology braid murder prevent trace toss achievement opposite manufacture",
            "type": "status",
          },
          Object {
            "created_time": "2022-03-17T05:04:37+00:00",
            "from_id": "user_7",
            "from_name": "Gigi Richter",
            "id": "post6233751a8febf_9c125548",
            "message": "calculation genuine visible wisecrack far tribe improve water twist hiccup instrument tenant torture helmet fuss ecstasy excavation palm field stunning snack morsel food housing building abundant trade pattern birthday mirror mail rescue canvas state donor rage space dignity snub save quotation connection silver secretion angel dare due space window delay old feature psychology scholar water trait discourage knock team failure clinic rough lift era delicate pedestrian retirement candle fine leader facility toss omission gradient ignite formal fund find swell favor breast memorandum dragon coach route reckless possibility Europe knock host project miscarriage advice flow scandal withdrawal appear permission insert gravel",
            "type": "status",
          },
        ]
      `);
  });

  test("clearPosts clears the posts", async () => {
    const view = renderHook(() => usePosts());

    await act(() => view.result.current.actions.loadPosts());

    expect(view.result.current.posts.length).toEqual(3);

    act(() => view.result.current.actions.clearPosts());

    expect(view.result.current.posts).toEqual([]);
  });
});
