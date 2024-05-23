import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import errorImage from "/imgs/errorPic.png";

const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>SORRY</div>
      <img className={styles.errImg} src={errorImage} />
      <div className={styles.subtitle}>We couldn't find that page</div>
      <div className={styles.message}>
        <p>Try searching or go back to:</p>
        <Link to="/">CCC Transfer Helper's Home Page</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
