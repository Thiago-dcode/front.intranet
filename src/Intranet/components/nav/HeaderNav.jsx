import React from "react";
import Nav from "../../../components/header/Nav";

import LogOutBtn from "../../../components/button/LogOutBtn";
export default function HeaderNav({ children }) {


  return (
    <Nav>
      {children}
      <LogOutBtn />
    </Nav>
  );
}
