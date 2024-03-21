"use client";

import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";
import React, { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import ProjectImage from "./ProjectImage";

export default function Projects() {
  const [state, setState] = useState(0);

  return (
    <Wrapper>
      <div className="lg:grid lg:grid-cols-3  gap-10 items-center lg:min-h-[600px]">
        <div>
          <Title>My Favourite Projects</Title>

          {/* List of the Projects */}
          <ProjectList state={state} setState={setState} />
        </div>

        {/* Images of the Projects */}
        <div className="col-span-2">
          <ProjectImage state={state} setState={setState} />
        </div>
      </div>
    </Wrapper>
  );
}
