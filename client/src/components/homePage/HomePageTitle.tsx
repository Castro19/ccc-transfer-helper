import { Fragment } from "react";

const HomePageTitle = () => {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold text-center mt-4 mb-2">
        California Community College Transfer Helper
      </h1>
      <p className="text-center text-lg text-gray-800 my-4">
        Generate Academic Schedule <span className="mx-2">|</span>
        Find Earned Degrees <span className="mx-2">|</span>
        View your General-Ed Completion <span className="mx-2">|</span>
        All in Seconds
      </p>
    </Fragment>
  );
};

export default HomePageTitle;
