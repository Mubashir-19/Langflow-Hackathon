// Loading.js
import React from 'react';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => (
  <div className="loading-container">
    <ClipLoader css={override} size={150} color={"#123abc"} loading={true} />
  </div>
);

export default Loading;
