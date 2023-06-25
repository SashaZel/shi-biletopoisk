import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICinema, IMovie, IReview } from "../../utils/biletoserviceApiTypes";
import { BASE_URL } from "../../utils/consts";
import { cinemaQuery } from "./reduxUtils";

export const biletopoiskApi = createApi({
  reducerPath: "biletopoiskApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovieById: builder.query<IMovie, string>({
      query: (movieID) => `movie?movieId=${movieID}`,
    }),
    getReviews: builder.query<IReview[], string>({
      query: (movieID) => `reviews?movieId=${movieID}`,
    }),
    getAllMovies: builder.query<IMovie[], unknown>({
      query: () => "movies",
    }),
    getAllCinemas: builder.query<ICinema[], void>({
      query: () => "cinemas",
    }),
    getMoviesByCinema: builder.query<IMovie[], string | undefined>({
      query: cinemaQuery,
    }),
  }),
});

export const {
  useGetMovieByIdQuery,
  useGetReviewsQuery,
  useGetAllMoviesQuery,
  useGetAllCinemasQuery,
  useGetMoviesByCinemaQuery,
} = biletopoiskApi;
