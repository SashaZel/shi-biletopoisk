import ReviewsPanel from "@/components/reviewsPanel/ReviewsPanel";
import { IMovie } from "../../../../utils/biletoserviceApiTypes";
import { BASE_URL, GENRE_INT } from "../../../../utils/consts";
import Image from "next/image";
import styles from "./page.module.css";
import AddItemPanel from "@/components/addItemPanel/AddItemPanel";

interface IPageProps {
  params: { movieID: string };
}

async function getMovie(id: string) {
  const res = await fetch(`${BASE_URL}movie?movieId=${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = res.json() as Promise<IMovie>;
  return result;
}

export default async function MoviePage({ params }: IPageProps) {
  const movie = await getMovie(params.movieID);
  const genreRUS = GENRE_INT["RUS"][movie.genre];

  return (
    <section>
      <article className="globalFlex globalCard">
        <div className={styles.imageContainer}>
          <Image className={styles.imagePreview} src={movie.posterUrl} fill={true} alt="movie poster" />
        </div>
        <div className={styles.content}>
          <div className="globalFlex globalFlexJust">
            <h1>{movie.title}</h1>
            <AddItemPanel movie={movie} isCart={false} />
          </div>
          <div className={styles.info}>
            <p>
              <span className="globalBold">Жанр:</span>
              {" " + genreRUS}
            </p>
            <p>
              <span className="globalBold">Год выпуска:</span>
              {" " + movie.releaseYear}
            </p>
            <p>
              <span className="globalBold">Рейтинг:</span>
              {" " + String(movie.rating)}
            </p>
            <p>
              <span className="globalBold">Режиссер:</span>
              {" " + movie.director}
            </p>
          </div>

          <h3 className={styles.descHeader}>Описание</h3>
          <p>{movie.description || " "}</p>
        </div>
      </article>
      <ReviewsPanel movieID={params.movieID} />
    </section>
  );
}
