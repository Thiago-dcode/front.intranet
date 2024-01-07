import { useEffect, useState } from "react";
import useAjax from "../../../../hooks/useAjax";

const useCategoriaWeb = () => {
  const [data, error, isPending, setConfig] = useAjax();
  const [categoriaWeb, setCategoriaWeb] = useState([]);
  const [key, setKey] = useState(null);
  const getCatWeb = (company, id, key) => {
    setCategoriaWeb([]);
    setKey(key);
    if (!(company && !isNaN(id) && !isNaN(key))) {

         return;
    }
    


    setConfig(`/api/${company}/modules/combinaciones/categoriaweb?id=${id}`);
  };
  useEffect(() => {
    if (data && !error) {
      setCategoriaWeb(data.data);
    }
  }, [data, error]);

  return [categoriaWeb, key, getCatWeb];
};

export default useCategoriaWeb;
