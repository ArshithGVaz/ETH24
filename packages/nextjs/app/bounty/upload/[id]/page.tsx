"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BountyForm } from "~~/components/bounty-form";

// type Props = {};

const Upload = () =>
  // props: Props
  {
    const params = useParams();
    return (
      <>
        {/* <div>page</div> */}
        <BountyForm />
      </>
    );
  };

export default Upload;
