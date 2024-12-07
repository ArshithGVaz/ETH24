import React from "react";
import { ExploreCards } from "./FocusCards";

// type Props = {};

const Explore = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold text-center w-full">Feeling like exploring around?</h1>
      <p className="text-xl font-semibold text-center w-full">Check these out!</p>
      <ExploreCards />
    </>
  );
};

export default Explore;
