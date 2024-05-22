import styles from "./ScheduleCard.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import calpolyLogo from "@/../public/imgs/calpoly.png";

type ScheduleCardProps = {
  id: string;
  ccc: string;
  univ: string;
  major: string;
  year: string;
};

const ScheduleCard = ({
  id,
  ccc,
  univ,
  major,
  year,
}: ScheduleCardProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className={styles.hoverBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
          />
        )}
      </AnimatePresence>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <p className={styles.ccc}>CCC: {ccc}</p>
        <p className={styles.univ}>
          University: {univ}
          {/* { <img src={calpolyLogo} alt={`${univ} calpolyLogo`} className={styles.univImage} /> } */}
        </p>

        <p className={styles.major}>Major: {major}</p>
        <p className={styles.year}>Year: {year}</p>
        {/* <p className={styles.id}>Schedule ID: {id}</p> */}
      </div>
    </div>
  );
};

export default ScheduleCard;
