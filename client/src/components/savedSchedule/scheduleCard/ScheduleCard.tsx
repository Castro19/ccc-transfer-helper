import styles from "./ScheduleCard.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

type ScheduleCardProps = {
  id: string;
  ccc: string;
  univ: string;
  major: string;
  year: string;
  onDelete: (id: string) => Promise<void>;
};

const ScheduleCard = ({
  id,
  ccc,
  univ,
  major,
  year,
  onDelete,
}: ScheduleCardProps): JSX.Element => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const onScheduleClick = () => {
    console.log("Clicked on schedule: ", id);
    navigate(`/schedules/${id}`);
  };
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
        <div className={styles.containerCCC}>
          <p className={styles.ccc}>CCC: {ccc}</p>
          <button
            onClick={() => onDelete(id)}
            className=""
            title="Delete Schedule"
          >
            <IoTrashBinOutline className="h-5 w-5 text-gray-900 hover:text-red-500" />
          </button>
        </div>

        <p className={styles.univ}>
          University: {univ}
          {/* { <img src={calpolyLogo} alt={`${univ} calpolyLogo`} className={styles.univImage} /> } */}
        </p>

        <p className={styles.major}>Major: {major}</p>
        <div className={styles.containerCCC}>
          <p className={styles.year}>Year: {year}</p>

          <button onClick={onScheduleClick} className="" title="Go to Schedule">
            <CiEdit className="h-5 w-5 text-gray-900 hover:text-green-700" />
          </button>
        </div>
        {/* <p className={styles.id}>Schedule ID: {id}</p> */}
      </div>
    </div>
  );
};

export default ScheduleCard;
