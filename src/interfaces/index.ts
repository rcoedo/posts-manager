export interface User {
  name: string;
  email: string;
  token: string;
}

export interface SupermetricsPost {
  id: string;
  from_name: string;
  from_id: string;
  message: string;
  type: string;
  created_time: string;
}

export interface SupermetricsUser {
  id: string;
  name: string;
}

export interface SupermetricsResponse<T> {
  meta: {
    request_id: string;
  };
  data: T;
}

export interface SupermetricsRegisterData {
  client_id: string;
  email: string;
  sl_token: string;
}

export interface SupermetricsPostsData {
  page: number;
  posts: SupermetricsPost[];
}

export type SupermetricsRegisterResponse = SupermetricsResponse<SupermetricsRegisterData>;
export type SupermetricsPostsResponse = SupermetricsResponse<SupermetricsPostsData>;
