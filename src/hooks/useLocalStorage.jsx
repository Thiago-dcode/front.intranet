import { useEffect, useState } from "react";
import ls from "localstorage-slim";
export default function useLocalStorage(key) {
  ls.config.encrypt = true;
  const [data, _setData] = useState(null);
  const [_key, setKey] = useState("");

  const getData = (key) => {
    setKey(key);
  };
  useEffect(() => {
    _setData(ls.get(_key));
  }, [_key]);
  useEffect(() => {
    _setData(ls.get(_key));
  }, []);

  return [data, getData];
}
