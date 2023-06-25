"use client";

import MovieCard from "@/components/movieCard/MovieCard";
import { selectCart, selectCartTotal } from "@/redux/cartSlice";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import Link from "next/link";

function EmptyCartMsg() {
  return (
    <div className={styles.cartElContainer}>
      Корзина пуста
      <Link href="/">Перейти к покупкам</Link>
    </div>
  );
}

export default function Cart() {
  const cartItems = useSelector(selectCart);
  const totalInCart = useSelector(selectCartTotal);

  const cartItemsList = cartItems.map((cartItem) => <MovieCard key={cartItem.id} isCart={true} movie={cartItem} />);
  const contentMsg = cartItems.length === 0 ? <EmptyCartMsg /> : <ul>{cartItemsList}</ul>;

  return (
    <section className={styles.container}>
      {contentMsg}
      <div className={styles.cartElContainer}>
        <span className={styles.totalEl}>Итого билетов:</span>
        <span className={styles.totalEl}>{totalInCart}</span>
      </div>
    </section>
  );
}
