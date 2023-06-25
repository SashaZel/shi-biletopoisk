import { ICinema } from "./biletoserviceApiTypes";

export const genres = ["unknown", "fantasy", "horror", "action", "comedy"] as const;
export const cinemas = ["He выбран", "Синема сад", "4 с половиной звезды", "Дружба"] as const;

export const BASE_URL = "http://localhost:3001/api/" as const;

export const GENRE_INT = {
  RUS: {
    unknown: "Не выбран",
    fantasy: "Фэнтези",
    horror: "Ужасы",
    action: "Боевик",
    comedy: "Комедия",
  },
};

export const DEFAULT_CINEMA: ICinema = {
  id: "",
  name: "He выбран",
  movieIds: [],
};

export const FIRST_MOVIES_LIMIT = 5;

export const MAX_TICKETS_LIMIT = 30;
