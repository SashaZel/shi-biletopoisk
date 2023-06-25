"use client";

import { useSelector } from "react-redux";
import { IMovie } from "../../../utils/biletoserviceApiTypes";
import { useGetAllCinemasQuery } from "@/redux/biletopoiskApiService";
import { selectContentReady } from "@/redux/cartSlice";
import MovieCard from "../movieCard/MovieCard";
import CinemaFilter from "../cinemasFilter/CinemaFilter";
import styles from "./filterWrapper.module.css";

interface IFilterWrapperProps {
  firstMoviesSerialized: string;
}

function firstPaintWithInitialData(firstMoviesSerialized: string) {
  let firstMoviesData = [];
  try {
    firstMoviesData = JSON.parse(firstMoviesSerialized) as IMovie[];
  } catch (error) {
    console.error("@FilterWrapper() Error in parsing JSON ", error);
    throw new Error("Error in parsing data");
  }

  const moviesList = firstMoviesData.map((movie) => <MovieCard key={movie.id} isCart={false} movie={movie} />);

  return (
    <div>
      <div className={styles.dummyMenuContainer}>
        <div className={styles.dummyMenuHeader}></div>
        <div className={styles.dummyMenuElement}></div>
        <div className={styles.dummyMenuHeader}></div>
        <div className={styles.dummyMenuElement}></div>
        <div className={styles.dummyMenuHeader}></div>
        <div className={styles.dummyMenuElement}></div>
      </div>
      <ul className={styles.firstMoviesListContainer}>{moviesList}</ul>
    </div>
  );
}

export default function FilterWrapper({ firstMoviesSerialized }: IFilterWrapperProps) {
  const contentReady = useSelector(selectContentReady);
  const { data } = useGetAllCinemasQuery();

  const firstPaintData = firstPaintWithInitialData(firstMoviesSerialized);
  let fetchedContent = null;
  if (data) fetchedContent = <CinemaFilter cinemas={data} />;

  return (
    <>
      {contentReady ? null : firstPaintData}
      {fetchedContent}
    </>
  );
}
