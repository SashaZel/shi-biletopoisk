import { genres, cinemas } from "./consts";

export type TGenre = (typeof genres)[number];
export type TCinemaName = (typeof cinemas)[number];

export type IRating = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
