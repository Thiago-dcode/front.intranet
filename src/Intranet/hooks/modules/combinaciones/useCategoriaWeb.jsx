import { useEffect, useState } from "react";
import useAjax from "../../../../hooks/useAjax";

const useCategoriaWeb = () => {
  const [data, error, isPending, setConfig] = useAjax();
  const [memoData, setMemoData] = useState({});
  const [categoriaWeb, setCategoriaWeb] = useState([]);
  const [key, setKey] = useState(null);
  const [id, setId] = useState(null);
  const getCatWeb = (company, id, key) => {
    setCategoriaWeb([]);
   

    if (!company || isNaN(id) || isNaN(key)) {
      return;
    }
    setKey(key);
    setId(id);
    if (memoData.hasOwnProperty(id)) {
      setCategoriaWeb(memoData[id]);
      return;
    }
    setConfig(`/api/${company}/modules/combinaciones/categoriaweb?id=${id}`);
  };
  useEffect(() => {
    if (data && !error) {
      setCategoriaWeb(data.data);
      setMemoData((prev) => {
        return {
          ...prev,
          [id]: data.data,
        };
      });
    }
  }, [data, error]);

  return [categoriaWeb, key, getCatWeb];
};

export default useCategoriaWeb;
