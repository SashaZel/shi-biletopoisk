import { TCinemaName, TGenre, IRating } from "./types";

export interface ICinema {
  id: string;
  name: TCinemaName;
  movieIds: string[];
}

export interface IMovie {
  title: string;
  posterUrl: string;
  releaseYear: number;
  description: string;
  genre: TGenre;
  id: string;
  rating: IRating;
  director: string;
  reviewIds: string[];
}

export interface IReview {
  id: string;
  name: string;
  text: string;
  rating: IRating;
  avatarUrl?: string;
}
