import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Announcement } from "../../types/Announcement.type";

export const announcementApiSlice = createApi({
  reducerPath: "announcementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Announcement"],
  endpoints: (builder) => ({
    getAnnouncement: builder.query<Announcement[], void>({
      query: () => "/announcement",
      providesTags: ["Announcement"],
    }),

    createAnnouncement: builder.mutation<Announcement, Announcement>({
      query: (data) => ({
        url: "/announcement",
        method: "post",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Announcement"],
    }),
    deleteAnnouncement: builder.mutation<void, string>({
      query: (id) => ({
        url: `/announcement/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Announcement"],
    }),
  }),
});

export const {
  useGetAnnouncementQuery,
  useCreateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApiSlice;
