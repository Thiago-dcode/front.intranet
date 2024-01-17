import { useEffect, useState } from "react";
import "../../assets/css/components/success.css";

// eslint-disable-next-line react/prop-types
export default function Success({ messages,useShow = true, color = 'bg-green-400' }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true)
    if(useShow){
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [useShow]);

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
                  className={`font-bold text-white ${color} px-2 py-1   rounded-md  text-xs`}
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
