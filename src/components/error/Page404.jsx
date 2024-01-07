import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div>
      <h1>Ups, pareces un poco perdid@</h1>

      <Link to={"/"}>Reubícate</Link>
    </div>
  );
}
