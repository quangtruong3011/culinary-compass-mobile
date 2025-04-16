import { BASE_URL } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.auth.access_token;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // getMe: builder.query<GetMeResponse, void>({
    //   query: () => ({
    //     url: "/users/me",
    //     method: "POST",
    //   }),
    //   transformResponse: (response: { data: GetMeResponse }) => {
    //     return response.data;
    //   },
    // }),
  }),
});

// export const { useGetMeQuery } = userApi;
