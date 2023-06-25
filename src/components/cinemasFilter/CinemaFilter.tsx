"use client";

import { ChangeEvent, useCallback, useMemo, useState, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { DEFAULT_CINEMA, GENRE_INT, genres } from "../../../utils/consts";
import { TGenre } from "../../../utils/types";
import { ICinema } from "../../../utils/biletoserviceApiTypes";
import { MoviesList } from "../moviesList/MoviesList";
import styles from "./cinemaFilter.module.css";

interface IFilterProps {
  cinemas: ICinema[];
}

export default function CinemaFilter({ cinemas }: IFilterProps) {
  const [tooltip, setTooltip] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const [currentCinema, setCurrentCinema] = useState<ICinema>();
  const [genre, setGenre] = useState<TGenre>("unknown");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const searchThrottle = useCallback(() => {
    let run = false;
    let lastCall: null | string = null;
    return function (searchQuery: string) {
      if (run) {
        lastCall = searchQuery;
      } else {
        setSearchQuery(searchQuery);
        run = true;
        lastCall = null;
        setTimeout(() => {
          run = false;
          lastCall && setSearchQuery(lastCall);
        }, 1000);
      }
    };
  }, []);

  const nextSearchThrottle = useMemo(() => searchThrottle(), [searchThrottle]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const queryInput = e.currentTarget.value.toLowerCase();
    setSearchInput(queryInput);
    if (!queryInput) {
      setSearchQuery("");
    }
    nextSearchThrottle(queryInput);
  };

  // Genre button element
  // start

  const handleGenreTooltip = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({ left: Number(buttonRect.left), top: Number(buttonRect.top) + 52 });
    setTooltip((tooltipName) => (tooltipName === "genre" ? "" : "genre"));
  };

  const handleGenreClick = (genre: TGenre) => {
    setGenre(genre);
    setTooltip("");
    setTooltipPosition({ left: 0, top: 0 });
  };

  const genreButton = (
    <button
      className={`${styles.menuButton} ${tooltip === "genre" ? styles.menuButtonActive : ""}`}
      onClick={(e) => handleGenreTooltip(e)}
    >
      <div>Выберите жанр</div>
      <picture>
        <img
          className={`${styles.buttonIcon} ${tooltip === "genre" ? styles.buttonIconUpside : ""}`}
          src="/icons/arrow.svg"
          alt="icon"
        />
      </picture>
    </button>
  );

  let genreTooltip = null;
  if (tooltip === "genre") {
    const genreList = genres.map((genre: TGenre) => (
      <li key={genre}>
        <button className={styles.tooltipButton} onClick={() => handleGenreClick(genre)}>
          {GENRE_INT["RUS"][genre]}
        </button>
      </li>
    ));
    genreTooltip = createPortal(
      <ul
        className={styles.tooltipContainer}
        style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
      >
        {genreList}
      </ul>,
      document.getElementById("tooltipContainer") || document.body
    );
  }

  // end
  // Genre button element

  // Cinemas button element
  //start

  const handleCinemaTooltip = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({ left: Number(buttonRect.left), top: Number(buttonRect.top) + 48 });
    setTooltip((tooltipName) => (tooltipName === "cinema" ? "" : "cinema"));
  };

  const handleCinemaClick = (cinema: ICinema) => {
    setCurrentCinema(cinema);
    setTooltip("");
    setTooltipPosition({ left: 0, top: 0 });
  };

  const cinemaButton = (
    <button
      className={`${styles.menuButton} ${tooltip === "cinema" ? styles.menuButtonActive : ""}`}
      onClick={(e) => handleCinemaTooltip(e)}
    >
      <div>Выберите кинотеатр</div>
      <picture>
        <img
          className={`${styles.buttonIcon} ${tooltip === "cinema" ? styles.buttonIconUpside : ""}`}
          src="/icons/arrow.svg"
          alt="icon"
        />
      </picture>
    </button>
  );

  const cinemasWithDefault = [...cinemas];
  cinemasWithDefault.unshift(DEFAULT_CINEMA);

  let cinemaTooltip = null;
  if (tooltip === "cinema") {
    const cinemaList = cinemasWithDefault.map((cinema) => (
      <li key={cinema.id}>
        <button className={styles.tooltipButton} onClick={() => handleCinemaClick(cinema)}>
          {cinema.name}
        </button>
      </li>
    ));
    cinemaTooltip = createPortal(
      <ul
        className={styles.tooltipContainer}
        style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
      >
        {cinemaList}
      </ul>,
      document.getElementById("tooltipContainer") || document.body
    );
  }

  // end
  // Cinemas button element

  return (
    <>
      {genreTooltip}
      {cinemaTooltip}
      <div>
        <div className={styles.menuContainer}>
          <h3 className={styles.menuHeader}>Фильтр поиска</h3>
          <form>
            <label className={styles.menuLabel}>Название</label>
            <input
              className={styles.textInput}
              type="text"
              value={searchInput}
              onChange={(e) => handleSearch(e)}
              placeholder="Введите название"
            />
          </form>
          <div className={styles.menuLabel}>Жанр</div>
          {genreButton}
          <div className={styles.menuLabel}>Кинотеатр</div>
          {cinemaButton}
        </div>
        <div onMouseEnter={() => setTooltip("")}>
          <MoviesList currentCinema={currentCinema} genre={genre} searchQuery={searchQuery} />
        </div>
      </div>
    </>
  );
}
