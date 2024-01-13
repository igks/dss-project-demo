import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTags } from "./tags";

export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_DOMAIN_SERVICE,
  }),
  endpoints: () => ({}),
  tagTypes: [...getTags()],
});
