import React, { ReactNode } from "react";
import IsPending from "../pending/IsPending";
import Error from "../error/Error";

const Form = ({
  title = "",
  elements,
  handleSubmit,
  buttonText,
  isPending = null,
  error = "",
}) => {
  return (
    <form
      className="flex flex-col items-center justify-between  bg-white rounded shadow-lg p-5"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h2 className="font-bold text-2xl">{title}</h2>
      <div className="flex flex-col items-center justify-center gap-3">
        {elements.map((element, i) => {
          return <div key={"div-input-" + i} id={"div-input-" + i}>{element}</div>;
        })}
      </div>

      <div className="flex items-center justify-center h-12  w-64  mt-8">
        {!isPending ? <button
          className=" h-full  w-full px-6 bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          type="submit"
        >
          {buttonText}
        </button> : <IsPending color="rgb(37 99 235)" />}
      </div>
      {error && <Error className="text-white mt-4 bg-red-500 rounded-sm px-2" message={error} />}

    </form>
  );
};

export default Form;
