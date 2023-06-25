"use client";

import { useDispatch } from "react-redux";
import { useGetMoviesByCinemaQuery } from "@/redux/biletopoiskApiService";
import { contentReady } from "@/redux/cartSlice";
import { TGenre } from "../../../utils/types";
import { ICinema } from "../../../utils/biletoserviceApiTypes";
import MovieCard from "../movieCard/MovieCard";
import styles from "./moviesList.module.css"

interface IMoviesListProps {
  currentCinema: ICinema | undefined;
  genre: TGenre;
  searchQuery: string;
}

export function MoviesList({ currentCinema, genre, searchQuery }: IMoviesListProps) {
  const { data, isFetching, isLoading } = useGetMoviesByCinemaQuery(currentCinema?.id);
  const dispatch = useDispatch();

  if (isLoading || isFetching) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  let dataFiltered = data;
  if (dataFiltered && searchQuery) {
    dataFiltered = dataFiltered.filter((movie) => movie?.title?.toLowerCase().includes(searchQuery));
  }
  if (dataFiltered && genre !== "unknown") {
    dataFiltered = dataFiltered.filter((movie) => movie?.genre === genre);
  }
  if (data) {
    const moviesList = dataFiltered?.map((movie) => <MovieCard key={movie.id} isCart={false} movie={movie} />);
    dispatch(contentReady(true));
    return <ul className={styles.container}>{moviesList}</ul>;
  }

  return <div className={styles.container}>Error in loading movies. Please refresh page.</div>;
}
