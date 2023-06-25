import Link from "next/link";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import ReduxWrapper from "@/redux/reduxWrapper";
import CartIcon from "@/components/cartIcon/CartIcon";
import "./globals.css";
import styles from "./layout.module.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const SFpro = localFont({
  src: "../fonts/SFProText-Medium.ttf",
  display: "swap",
});

export const metadata = {
  title: "Билетопоиск",
  description: "Мы — крупнейший сервис о кино в рунете.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.className} ${SFpro.className}`}>
      <body>
        <ReduxWrapper>
          <div id="modalContainer" className={styles.modalContainer}></div>
          <div id="tooltipContainer" className={styles.tooltipContainer}></div>

          <header className={styles.headerContainer}>
            <h1>
              <Link className={styles.logo} href="/">
                Билетопоиск
              </Link>
            </h1>
            <div>
              <Link className={styles.basketContainer} href="/cart">
                <CartIcon />
                <picture>
                  <img className={styles.basketIcon} src="/icons/basket.svg" alt="backet" />
                </picture>
              </Link>
            </div>
          </header>
          <main className={styles.mainContainer}>{children}</main>
          <footer className={styles.footerContainer}>
            <Link className={styles.footerLink} href="/faq">
              Вопросы-ответы
            </Link>
            <Link className={styles.footerLink} href="/about">
              О нас
            </Link>
          </footer>
        </ReduxWrapper>
      </body>
    </html>
  );
}
