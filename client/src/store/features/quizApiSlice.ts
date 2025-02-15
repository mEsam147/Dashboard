import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Quiz } from "../../types/quiz.type";

export const quizApiSlice = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    createQuiz: builder.mutation<Quiz, Quiz>({
      query: (data) => ({
        url: "/quiz",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
    getAllQuiz: builder.query<Quiz[], void>({
      query: () => "/quiz",
      providesTags: ["Quiz"],
    }),
    getSingleQuiz: builder.query<Quiz, string>({
      query: (id) => `/quiz/${id}`,
      providesTags: ["Quiz"],
    }),
    getRandomQuiz: builder.query<Quiz[], void>({
      query: () => `/quiz/random`,
      providesTags: ["Quiz"],
    }),
    deleteQuiz: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),
    updateQuiz: builder.mutation<
      { success: boolean },
      { id: string; data: Partial<Quiz> }
    >({
      query: ({ id, data }) => ({
        url: `/quiz/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
    submitAnswer: builder.mutation<
      { success: boolean; message: string },
      { id: string; studentAnswers: { questionId: string; answer: string }[] }
    >({
      query: ({ id, studentAnswers }) => ({
        url: `/quiz/${id}/submit`,
        method: "POST",
        body: { studentAnswers },
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useGetAllQuizQuery,
  useGetSingleQuizQuery,
  useGetRandomQuizQuery,
  useDeleteQuizMutation,
  useUpdateQuizMutation,
  useSubmitAnswerMutation,
} = quizApiSlice;
