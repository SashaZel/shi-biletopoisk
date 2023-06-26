"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, MouseEvent } from "react";
import { CONTENT_PAGE_FAQ } from "../../../utils/content";
import styles from "./page.module.css";

interface IMenuAccordionProps {
  children: ReactNode;
}

interface IElementAccordionProps {
  title: string;
  text: string;
}

const AccordContext = createContext<[string, Dispatch<SetStateAction<string>>] | undefined>(undefined);

const MenuAccordion = ({ children }: IMenuAccordionProps) => {
  const [active, setActive] = useState("");
  return <AccordContext.Provider value={[active, setActive]}>{children}</AccordContext.Provider>;
};

const ElementAccordion = ({ title, text }: IElementAccordionProps) => {
  const context = useContext(AccordContext);
  const [active, setActive] = context ? [context[0], context[1]] : ["", () => {}];

  const handleClick = (e: MouseEvent<HTMLHeadingElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    if (title === active) {
      setActive("");
      return;
    }
    setActive(title);
  };

  return (
    <div className={styles.accCard}>
      <div className={styles.accButton} onClick={(e) => handleClick(e)}>
        <h3>{title}</h3>
        <picture>
          <img
            className={`${styles.accIcon} ${active === title ? styles.accIconUp : styles.accIconDown}`}
            src="/icons/arrow-big.svg"
            alt="icon"
          />
        </picture>
      </div>
      <p className={`${styles.accText} ${active === title ? styles.accTextVisible : styles.accTextHidden}`}>{text}</p>
    </div>
  );
};

const processFaqMarkup = (markup: IElementAccordionProps[]) => {
  const result = [];
  for (let i = 0; i < markup.length; i++) {
    const { title, text } = markup[i];
    result.push(<ElementAccordion key={title} title={title} text={text} />);
  }
  return result;
};

export default function FAQ() {
  const contentAccordion = processFaqMarkup(CONTENT_PAGE_FAQ);
  return (
    <section>
      <div className="globalCard">
        <h2 className="globalH1">Вопросы-ответы</h2>
      </div>
      <MenuAccordion>{contentAccordion}</MenuAccordion>
    </section>
  );
}
