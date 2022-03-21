import axios, { AxiosResponse } from "axios";
import { SupermetricsPostsResponse, SupermetricsRegisterResponse } from "../interfaces";

export const register = async (name: string, email: string): Promise<AxiosResponse<SupermetricsRegisterResponse>> => {
  return axios.post<SupermetricsRegisterResponse>(`https://api.supermetrics.com/assignment/register`, {
    client_id: "ju16a6m81mhid5ue1z3v2g0uh",
    email: email,
    name: name,
  });
};

export const getPosts = async (token: string, page = 1): Promise<AxiosResponse<SupermetricsPostsResponse>> => {
  return axios.get<SupermetricsPostsResponse>(`https://api.supermetrics.com/assignment/posts`, {
    params: { sl_token: token, page },
  });
};
