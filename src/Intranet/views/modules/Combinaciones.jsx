import { useState, useCallback } from "react";
import Icon from "../../components/icon/Icon";
import "../../assets/css/modules/combinaciones.css";
import PymeSearch from "../../components/pyme/PymeSearch";
import { useCompany } from "../../../Context/ContextProvider";
import { useEffect } from "react";
import useAjax from "../../../hooks/useAjax";
import Button from "../../components/button/Button";
import IsPending from "../../../components/pending/IsPending";
import RenderTd from "../../components/modules/combinaciones/RenderTd";
import Success from "../../components/popup/Success";
import { roundTo } from "../../../utils/Utils";
import useCategoriaWeb from "../../hooks/modules/combinaciones/useCategoriaWeb";
export default function Combinaciones() {
  const company = useCompany();
  const [success, setSuccess] = useState([]);
  const [count, setCount] = useState(10);
  const [isSearch, setIsSearch] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);
  const [combinaciones, setCombinaciones] = useState([]);
  const [codArticulo, setCodArticulo] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [limit, setLimit] = useState(10);
  const [url, setUrl] = useState("");
  const [updateForm, setUpdateForm] = useState({});
  const [insertForm, setInsertForm] = useState({});
  const [categoriaWeb, key, getCatWeb] = useCategoriaWeb();
  const [data, error, isPending, setConfig] = useAjax();
  const [update, errorUpdate, isPendingUpdate, setConfigUpdate] = useAjax();
  const [insert, errorInsert, isPendingInsert, setConfigInsert] = useAjax();

  const handleSearch = (e) => {
    setSuccess(false)
    e.preventDefault();
    const btn = e.nativeEvent.submitter.name;
    setSuccess([]);
    setIsUpdate(true);
    let newUrl = "";
    if (btn === "search") {
      setIsSearch(true);
      setCombinaciones([]);
      newUrl = `${
        company.name
      }/modules/combinaciones?codarticulo=${codArticulo}&proveedor=${proveedor}&limit=${10}`;
    } else {
      setIsSearch(false);

      newUrl = `${company.name}/modules/combinaciones?codarticulo=${codArticulo}&proveedor=${proveedor}&limit=${limit}`;
    }
    setUrl(newUrl);
  };
  const handleArticulos = (articulo) => {
    setCodArticulo(articulo);
    setProveedor("");
  };
  const handleProveedor = (prov) => {
    setProveedor(prov);
    setCodArticulo("");
  };
  const handleAgregar = () => {
    if (!combinaciones.length) {
      handleAddInsert();
      return;
    }
    const lastItem = JSON.parse(
      JSON.stringify(combinaciones[combinaciones.length - 1])
    );

    const updatedLastItem = {
      ...lastItem,
      S_COD: { ...lastItem.S_COD, data: "", readonly: true },
      S_REF: { ...lastItem.S_REF, readonly: false },
      S_nom: { ...lastItem.S_nom, readonly: false },
      S_talla: { ...lastItem.S_talla, readonly: false },
      S_color: { ...lastItem.S_color, readonly: false },
      I_info: { ...lastItem.I_info, isInsert: true, modified: true },
    };

    setCombinaciones((prev) => [...prev, updatedLastItem]);
  };
  const handleAddInsert = () => {
    setIsUpdate(false);

    setUrl(`${company.name}/modules/combinaciones/template`);
  };
  const handlePrice = useCallback((combinacion) => {
    const precio = combinacion["S_precio"];
    const descuento = combinacion["S_des"];
    const margen = combinacion["S_marg"];
    const coste = roundTo(
      (parseFloat(!precio.data ? 0 : precio.data) / 100) *
        (100 - parseFloat(!descuento.data ? 0 : descuento.data)),
      2
    );
    combinacion["S_coste"].data = coste < 0 ? 0 : coste;
    const venta = roundTo(
      parseFloat(combinacion["S_coste"].data) +
        combinacion["S_coste"].data *
          (parseFloat(!margen.data ? 0 : margen.data) / 100),
      2
    );

    combinacion["S_P.V.A"].data = venta < 0 ? 0 : venta;
  }, []);
  const handleColorTalla = useCallback((combinacion) => {
    const colors = combinacion["S_color"].data.split(",");
    const tallas = combinacion["S_talla"].data.split(",");
    if (!(colors || tallas)) return;
    const valorcaracts = [];
    colors.forEach((col) => {
      tallas.forEach((tal) => {
        valorcaracts.push(`${col}-${tal}`);
      });
    });
    const cTypeArr = valorcaracts.map((valorcaract) => {
      return {
        valorcaract,
        value: null,
      };
    });
    combinacion["C_compra"].data = cTypeArr;
    combinacion["C_venta"].data = cTypeArr;
    combinacion["C_codbar"].data = cTypeArr;

    combinacion["D_deshab"].data = valorcaracts;
  }, []);
  const handleCType = useCallback((value, _key, combinacion) => {
    const [i, valorcaract, _value] = value.split("_");
    let obj = {
      valorcaract: valorcaract,
    };
    if (typeof combinacion[_key].data[parseInt(i)] === "undefined") {
      combinacion[_key].data.push(obj);
    }
    obj.value = _value;
    if (_key === "C_compra" || _key === "C_venta") {
      obj.value = isNaN(parseFloat(_value)) ? 0 : parseFloat(_value);
    }
    combinacion[_key].data[parseInt(i)] = obj;
  }, []);

  const handleDeshab = useCallback((value, _key, combinacion) => {
    const [action, data] = value.split("_");
   
    switch (action) {
      case "add":
        combinacion[_key].data = combinacion[_key].data.filter(
          (d) => d !== data
        );
        combinacion[_key].deshab = [data, ...combinacion[_key].deshab];
        break;
      case "del":
        combinacion[_key].deshab = combinacion[_key].deshab.filter(
          (d) => d !== data
        );
        combinacion[_key].data = [data, ...combinacion[_key].data];
        break;
      default:
        break;
    }
  }, []);
  const handleChange = (i, _key, value) => {
    let combinacion = JSON.parse(JSON.stringify(combinaciones[i]));
    const [type, key] = _key.split("_");
    switch (type) {
      case "S":
        combinacion[_key].data = value;
        if (key === "precio" || key === "des" || key === "marg") {
          const num = value ? parseFloat(value) : 0;

          if (isNaN(num)) return;
          combinacion[_key].data = value;
          handlePrice(combinacion);
        }
        if (key === "talla" || key === "color") {
          handleColorTalla(combinacion);
        }
        break;

      case "A":
        combinacion[_key].id = value;
        if (_key === "A_hombre/mujer") {
          if (value) {
            getCatWeb(company.name, parseInt(value), i);
          }
        }
        break;
      case "T":
        combinacion[_key].id = value;
        break;
      case "C":
        // eslint-disable-next-line no-case-declarations

        // eslint-disable-next-line no-case-declarations
        handleCType(value, _key, combinacion);

        break;
      case "D":
        handleDeshab(value, _key, combinacion);

        break;

      default:
        break;
    }
    combinacion["I_info"].modified = true;
    setCombinaciones((prev) =>
      prev.map((item, j) => {
        if (j === i) return combinacion;
        return item;
      })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let toInsert = [];
    let toUpdate = [];
    for (let i = 0; i < combinaciones.length; i++) {
      let objForm = {};
      const combinacion = combinaciones[i];
      if (
        !combinacion["I_info"].modified ||
        !combinacion["S_REF"].data ||
        !combinacion["S_nom"].data
      )
        continue;
      const entries = Object.entries(combinacion);
      for (let j = 0; j < entries.length; j++) {
        try {
          const [_key, value] = entries[j];
          const [type, key] = _key.split("_");
          switch (type) {
            case "S":
              objForm[key] = value.data;
              break;
            case "A":
              objForm[key] = value.id;
              break;
            case "T":
              objForm[key] = value.id;
              break;
            case "C":
              objForm[key] = value.data.filter((d) => d.value);
              break;
            case "D":
              objForm[key] = value.deshab;
              break;

            default:
              break;
          }
        } catch (error) {
          console.log(
            `Error handling form ${j} ${entries[j]} ${error.message}`
          );
        }
      }
      if (combinacion["I_info"].isInsert) toInsert.push(objForm);
      else toUpdate.push(objForm);
    }
    if(toUpdate)setUpdateForm(toUpdate);
    if(toInsert)setInsertForm(toInsert)
    
  };


  useEffect(() => {
    setIsUpdate(false);
    setUrl(`${company.name}/modules/combinaciones/template`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!url) return;
    setConfig("/api/" + url, [], "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  useEffect(() => {
 try {
  if (data && !error) {
    setUrl("");
    if(!data.hasOwnProperty('data')) return
    const { isTemplate, count, articulos } = data.data;
   
    setCount(count);
    if (isTemplate) {
      setCombinaciones(articulos);
    } else {
      setCombinaciones((prev) => [...prev, ...articulos]);
    }
  }
 } catch (error) {
  
 }
  }, [data, error]);

  useEffect(() => {
    if (Object.keys(updateForm).length > 0) {
      setConfigUpdate(
        `/api/${company.name}/modules/combinaciones/update`,
        updateForm,
        "POST"
      );
    }
  }, [updateForm]);

  useEffect(() => {
    if (Object.keys(insertForm).length) {
      setConfigInsert(
        `/api/${company.name}/modules/combinaciones/insert`,
        insertForm,
        "POST"
      );
    }
  }, [insertForm]);
  useEffect(() => {
    if (update && !errorUpdate) {
      setCombinaciones([]);
      console.log("Success update:", update.data);
      setSuccess((prev) => [update.data, ...prev]);
      if (url) {
        setUrl("");
      }

      return;
    }
    console.log("Error update:", errorUpdate);
  }, [update, errorUpdate]);

  useEffect(() => {
    if (insert && !errorInsert) {
      setCombinaciones([]);
      console.log("Success insert:", insert);
      setSuccess((prev) => [insert.data, ...prev]);
      if (url) {
        setUrl("");
      }

      return;
    }
    console.log("Error insert:", errorInsert);
  }, [insert, errorInsert]);

  useEffect(() => {
    setCombinaciones((prev) =>
      prev.map((item, i) => {
        if (i === parseInt(key)) {
          return {
            ...item,
            ["T_cat.web"]: {
              ...item["T_cat.web"],
              data: categoriaWeb,
            },
          };
        }
        return item;
      })
    );
  }, [categoriaWeb, key]);
  useEffect(() => {
    // console.log("combinaciones", combinaciones);
  }, [combinaciones]);

  return (
    <div
      id="combinaciones-module"
      className="table-pyme h-screen relative flex w-full  items-center 
flex-col gap-3 p-4"
    >
      <PymeSearch
        handleBtn={() => {}}
        isPending={isPending}
        handleSearch={handleSearch}
        setCodArticulo={handleArticulos}
        setProveedor={handleProveedor}
        codArticulo={codArticulo}
        proveedor={proveedor}
      />
      {Array.isArray(data?.data?.articulos) &&
        count === 10 &&
        isUpdate &&
        success.length < 1 && (
          <form
            onSubmit={(e) => {
              handleSearch(e);
            }}
            className=" self-end mr-2"
          >
            {!isPending ? (
              <Button
              
                name="more"
                handleBtn={() => {
                  setLimit(limit + 10);
                }}
                content="Más"
                type="submit"
              >
                <Icon icon={"ArrowDown"} />
              </Button>
            ) : (
              <IsPending size="25" color={company.color} />
            )}
          </form>
        )}

      {Array.isArray(combinaciones) &&
      combinaciones.length > 0 &&
      (!isPending || !isSearch || !isUpdate) &&
      success.length < 1 ? (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className=" flex flex-col  h-3/4 items-center gap-3  z-10 w-full "
        >
          <div className="w-full  px-2  relative  overflow-auto gap-4 pb-6">
            <table className="font-sans w-full text-sm rounded-lg border-collapse border border-slate-400">
              <thead className="z-[100] py-2 sticky top-0 bg-bera-textil text-xs capitalize m-auto text-white">
                <tr>
                  <th></th>
                  <th></th>

                  {Object.keys(combinaciones[0]).map((_key, i) => {
                    const key = _key.split("_");
                    if (key[0] !== "I") {
                      return (
                        <th
                          key={"th-combinaciones-" + +"-" + i}
                          id={"th-" + i}
                          className="px-2 text-sm"
                        >
                          {key.length > 1 ? key[1] : key[0]}
                        </th>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {combinaciones.map((comb, _i) => {
                  return (
                    <tr
                      key={"tr-combinaciones-" + _i}
                      id={"tr-" + _i}
                      className="h-9 pb-2 odd:bg-white combinaciones-tr"
                    >
                      <td className=" border border-slate-300  text-xs  text-center w-2">
                        <Button
                          bgColor="red"
                          content="x"
                          className="w-5 h-5 rounded-sm font-bold text-lg flex items-center justify-center"
                          handleBtn={() => {
                            setCombinaciones((prev) =>
                              prev.filter((item, i) => i !== _i)
                            );
                          }}
                          params={[]}
                          type="button"
                        ></Button>
                      </td>
                      <td className=" border border-slate-300  text-xs  text-center w-2">
                        {_i + 1}
                      </td>
                      {Object.entries(comb).map(([key, value], i) => {
                        return (
                          <RenderTd
                            handleChange={handleChange}
                            company={company}
                            i={_i}
                            key={"td-combinaciones-" + key + "-" + i}
                            _key={key}
                            value={value}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!error && !isPending && !isPendingUpdate ? (
            <div className=" w-full flex items-center justify-between">
              <Button
                name="agregar"
                handleBtn={handleAgregar}
                type="button"
                content="Agregar"
              />
              <Button type="submit" content="Actualizar" />
            </div>
          ) : (
            <div className=" flex  flex-row  items-start justify-start">
              <IsPending size="25" color={company.color} />
            </div>
          )}
        </form>
      ) : null}

      {success.length > 0 && (
        <Success
          messages={success.reduce(
            (acc, curr) => [
              ...curr.articulos.map(
                (articulo) =>
                  `Artículo: ${articulo.COD}, ${
                    curr.isUpdate ? "actualizado" : "insertado"
                  } con éxito!`
              ),
              ...acc,
            ],
            []
          )}
        />
      )}
    </div>
  );
}
