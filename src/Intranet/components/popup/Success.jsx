import { useEffect, useState } from "react";
import "../../assets/css/components/success.css";

// eslint-disable-next-line react/prop-types
export default function Success({ messages }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, []);

  return (
    <>
      {Array.isArray(messages) && messages && (
        <div
          className={`absolute flex flex-col gap-2 right-2 popup-success ${
            show ? "show" : "hide"
          }`}
        >
          {messages &&
            // eslint-disable-next-line react/prop-types
            messages.map((message, i) => {
              return (
                <p
                  key={`${i}-${message}`}
                  className="font-bold text-white bg-green-400 px-2 py-1   rounded-md  text-xs"
                >
                  {message}
                </p>
              );
            })}
        </div>
      )}
    </>
  );
}
