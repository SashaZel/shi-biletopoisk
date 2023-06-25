import { ICinema } from "../../utils/biletoserviceApiTypes";

export function cinemaQuery(cinema: ICinema["id"]) {
  if (!cinema) return "movies";
  return `movies?cinemaId=${cinema}`;
}
