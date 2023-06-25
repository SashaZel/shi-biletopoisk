import { IReview } from "../../../utils/biletoserviceApiTypes";
import styles from "./reviewCard.module.css";

interface IReviewCardProps {
  review: IReview;
}

export default function ReviewCard({ review }: IReviewCardProps) {
  return (
    <div className="globalFlex globalCard">
      <div className={styles.avatar}>
        <picture>
          <img src={review.avatarUrl || "/icons/photo.svg"} alt="avatar" />
        </picture>
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <h3>{review.name}</h3>
          <div className={styles.rating}>
            Оценка: <span className={styles.ratingNum}>{" " + review.rating}</span>
          </div>
        </div>
        <p className={styles.text}>{review.text}</p>
      </div>
    </div>
  );
}
