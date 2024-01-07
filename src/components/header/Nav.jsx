import React from "react";

export default function Nav({ children }) {
  return (
    <nav className=" w-full flex justify-between items-center">
      {children}
    </nav>
  );
}
