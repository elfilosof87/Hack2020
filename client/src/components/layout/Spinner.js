import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{
          width: "80px",
          margin: "150px auto auto auto ",
          display: "block"
        }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;
