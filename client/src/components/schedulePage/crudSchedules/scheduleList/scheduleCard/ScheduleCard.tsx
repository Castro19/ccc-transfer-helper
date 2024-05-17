import styles from "./ScheduleCard.module.css";

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
  return (
    <div className={styles.container}>
      <p className={styles.ccc}>CCC: {ccc}</p>
      <p>univ: {univ}</p>
      <p>major: {major}</p>
      <p>year: {year}</p>
    </div>
  );
};

export default ScheduleCard;
