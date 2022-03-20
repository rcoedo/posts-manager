import { AxiosResponse } from "axios";
import { SupermetricsPostsResponse, SupermetricsRegisterResponse } from "../interfaces";
import postsJson from "../fixtures/posts.json";

const mockedResponse = <T>(data: T) => ({
  meta: {
    request_id: "request_id",
  },
  data,
});

export const register = async (email: string): Promise<AxiosResponse<SupermetricsRegisterResponse>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockedResponse({
          client_id: "client_id",
          email,
          sl_token: "MOCK_TOKEN",
        }),
        status: 200,
        statusText: "status text",
        headers: {},
        config: {},
      });
    }, 2000);
  });
};

export const getPosts = async (): Promise<AxiosResponse<SupermetricsPostsResponse>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: mockedResponse(postsJson),
        status: 200,
        statusText: "status text",
        headers: {},
        config: {},
      });
    }, 10);
  });
};
