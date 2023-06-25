"use client";

import { selectCartTotal } from "@/redux/cartSlice";
import { useSelector } from "react-redux";
import styles from "./cartIcon.module.css";

export default function CartIcon() {
  const totalItemsInCart = useSelector(selectCartTotal);
  if (totalItemsInCart === 0) return null;
  return <div className={styles.container}>{totalItemsInCart}</div>;
}
