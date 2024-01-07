import React from "react";

import { useLogout } from "../../hooks/useAuth";

export default function LogOutBtn() {
  const logOut = useLogout();

  return (
    <form
      className="lg:mr-3 py-2 px-6 bg-arzumaOrange hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
      to="/login"
      onSubmit={(e) => {
        logOut(e);
      }}
    >
      <button type="submit">Salir</button>
    </form>
  );
}
