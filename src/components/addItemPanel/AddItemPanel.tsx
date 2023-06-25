"use client";

import { useState, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMovie } from "../../../utils/biletoserviceApiTypes";
import { MAX_TICKETS_LIMIT } from "../../../utils/consts";
import { increment, decrement, selectMovieQuantity, deleteItem } from "@/redux/cartSlice";
import styles from "./addItemPanel.module.css";

interface IAddItemPanelProps {
  movie: IMovie;
  isCart: boolean;
}

export default function AddItemPanel({ movie, isCart }: IAddItemPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const movieInCartQuantity = useSelector(selectMovieQuantity(movie.id));
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment(movie));
  };

  const handleDecrement = () => {
    if (movieInCartQuantity === 1) {
      setIsModalOpen(true);
      return;
    }
    dispatch(decrement(movie));
  };

  const handleDelete = () => {
    setIsModalOpen((isOpen) => !isOpen);
  };

  const handleDelYes = () => {
    setIsModalOpen((isOpen) => !isOpen);
    dispatch(deleteItem(movie.id));
  };

  const handleCloseModal = (e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen((isOpen) => !isOpen);
  };

  const handleBlockPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  let deleteButton = null;
  if (isCart) {
    deleteButton = (
      <button className={styles.deleteButton} onClick={handleDelete}>
        <picture>
          <img src="/icons/close.svg" alt="icon" />
        </picture>
      </button>
    );
  }

  const modalWindow = isModalOpen
    ? createPortal(
        <div className={styles.modalWindow} onClick={(e) => handleCloseModal(e)}>
          <div className={styles.modalContainer} onClick={(e) => handleBlockPropagation(e)}>
            <div className={styles.modalHeaderContainer}>
              <h3 className={styles.modalHeader}>Удаление билета</h3>
              <button className={styles.modalCloseButton} onClick={(e) => handleCloseModal(e)}>
                <picture>
                  <img className={styles.modalCloseIcon} src="/icons/close.svg" alt="icon" />
                </picture>
              </button>
            </div>
            <p>Вы уверены, что хотите удалить билет?</p>
            <div className={styles.modalYesNoContainer}>
              <button className={`${styles.modalButton} ${styles.buttonYes}`} onClick={handleDelYes}>
                Да
              </button>
              <button className={`${styles.modalButton} ${styles.buttonNo}`} onClick={(e) => handleCloseModal(e)}>
                Нет
              </button>
            </div>
          </div>
        </div>,
        document.getElementById("modalContainer") || document.body
      )
    : null;

  return (
    <>
      {modalWindow}
      <div className={styles.container}>
        <div className={styles.addButtonsContainer}>
          <button
            className={`${styles.button} ${movieInCartQuantity > 0 ? styles.buttonEnabled : styles.buttonDisabled}`}
            onClick={handleDecrement}
          >
            <picture>
              <img src="/icons/minus.svg" alt="icon" />
            </picture>
          </button>
          <div>{movieInCartQuantity}</div>
          <button
            className={`${styles.button} ${
              movieInCartQuantity < MAX_TICKETS_LIMIT ? styles.buttonEnabled : styles.buttonDisabled
            }`}
            onClick={handleIncrement}
          >
            <picture>
              <img src="/icons/plus.svg" alt="icon" />
            </picture>
          </button>
        </div>
        {deleteButton}
      </div>
    </>
  );
}
