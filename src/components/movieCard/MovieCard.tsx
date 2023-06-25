import Link from "next/link";
import Image from "next/image";
import { GENRE_INT } from "../../../utils/consts";
import { IMovie } from "../../../utils/biletoserviceApiTypes";
import AddItemPanel from "../addItemPanel/AddItemPanel";
import styles from "./MovieCard.module.css";

interface IMovieCardProps {
  isCart: boolean;
  movie: IMovie;
}

export default function MovieCard({ isCart, movie }: IMovieCardProps) {
  return (
    <li className={styles.container}>
      <Link className={styles.imageContainer} href={`/movie/${movie.id}`}>
        <Image className={styles.imagePreview} src={movie.posterUrl} fill={true} alt="movie poster" />
      </Link>
      <div className={styles.info}>
        <h2 className={styles.infoHeader}>
          <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
        </h2>
        <p className={styles.infoGenre}>{GENRE_INT["RUS"][movie.genre]}</p>
      </div>
      <AddItemPanel movie={movie} isCart={isCart} />
    </li>
  );
}
