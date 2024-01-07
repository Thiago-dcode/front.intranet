import React, { ReactNode } from "react";

const Wrapper = ({ children }) => {
  return <main className="flex flex-col items-center">{children}</main>;
};

export default Wrapper;
