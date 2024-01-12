import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTags } from "./tags";

export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/`,
  }),
  endpoints: () => ({}),
  tagTypes: [...getTags()],
});
