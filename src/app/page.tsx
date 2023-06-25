import { BASE_URL, FIRST_MOVIES_LIMIT } from "../../utils/consts";
import { IMovie } from "../../utils/biletoserviceApiTypes";
import FilterWrapper from "@/components/filterWrapper/FilterWrapper";

async function getFirstMovies() {
  const res = await fetch(`${BASE_URL}movies`);

  if (!res.ok) {
    throw new Error("@getFirstMovies() @Home: Failed to fetch data");
  }
  const resultAll = (await res.json()) as IMovie[];
  const resultLimited = resultAll.slice(0, FIRST_MOVIES_LIMIT);
  return resultLimited;
}

export default async function Home() {
  // trick with 'firstMoviesSerialized' is used for extremely fast First Paint for client
  // It is similar to SSG. See Next.js docs:
  // https://nextjs.org/docs/getting-started/react-essentials#passing-props-from-server-to-client-components-serialization
  const movies = await getFirstMovies();
  const firstMoviesSerialized = JSON.stringify(movies);

  return (
    <section>
      <FilterWrapper firstMoviesSerialized={firstMoviesSerialized} />
    </section>
  );
}
