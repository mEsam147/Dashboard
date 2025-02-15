import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Question } from "../../types/question.type";

export const questionApiSlice = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    createQuestion: builder.mutation<Question, Question>({
      query: (data) => ({
        url: "/question",
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Question"],
    }),
    getAllQuestion: builder.query<Question[], void>({
      query: () => "/question",
      providesTags: ["Question"],
    }),
    getSingleQuestion: builder.query<Question, string>({
      query: (id) => `/question/${id}`,
      providesTags: ["Question"],
    }),
    updateQuestion: builder.mutation<
      Question,
      { id: string; data: Partial<Question> }
    >({
      query: ({ id, data }) => ({
        url: `/question/${id}`,
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Question"],
    }),
    deleteQuestion: builder.mutation<Question, string>({
      query: (id) => ({
        url: `/question/${id}`,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Question"],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetAllQuestionQuery,
  useGetSingleQuestionQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApiSlice;
