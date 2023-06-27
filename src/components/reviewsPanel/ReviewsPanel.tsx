import { IReview } from "../../../utils/biletoserviceApiTypes";
import { BASE_URL } from "../../../utils/consts";
import ReviewCard from "../reviewCard/ReviewCard";

interface IReviewsPanelProps {
  movieID: string;
}

async function getReview(id: string) {
  const res = await fetch(`${BASE_URL}reviews?movieId=${id}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("@getReview() @ReviewPanel Failed to fetch review data");
  }
  const result = res.json() as Promise<IReview[]>;
  return result;
}

export default async function ReviewsPanel({ movieID }: IReviewsPanelProps) {
  const reviews = await getReview(movieID);
  const reviewList = reviews.map((review) => <ReviewCard key={review.id} review={review} />);
  return <ul>{reviewList}</ul>;
}
