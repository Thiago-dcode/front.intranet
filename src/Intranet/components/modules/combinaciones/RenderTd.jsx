import React, { useState } from "react";
import { useEffect } from "react";
import useAjax from "../../../../hooks/useAjax";
import { capitalize, roundTo, handlePrice } from "../../../../utils/Utils";

export default function RenderTd({ handleChange, _key, value, i }) {
  const [arrayData, setArrayData] = useState([]);
  const [desahabilitado, setDeshabilitado] = useState([]);

  const printTree = (tree, __tree = []) => {
    let _tree = __tree;

    for (let i = 0; i < tree.length; i++) {
      let obj = {
        id: tree[i].id,
        name: tree[i].name,
      };
      _tree.push(obj);

      if (!tree[i].children) continue;

      printTree(tree[i].children, _tree);
    }

    return _tree;
  };
  useEffect(() => {
    try {
      const [type, key] = _key.split("_");

      if (type.toUpperCase() === "A" && Array.isArray(value.data)) {
        setArrayData(value.data);
      }
    } catch (error) {
      console.log("useEffect:", error);
    }

    if (_key === "D_deshab" && value.hasOwnProperty("deshab")) {
      try {
        const deshab = value.deshab.map((d) => d.VALORCARACT);
        // setDeshabilitado(deshab)
      } catch (error) {
        console.log(error);
      }
    }
  }, [_key, value]);

  const renderTd = (_key, value, i) => {
    try {
      const [type, key] = _key.split("_");

      // according to the key, the value will render different(input, select, radio...)
      // all keys from the api start with  S,A,T,OR C
      // S: The value of that key is a simple string or number.
      // A: The value is an Array.
      // T: The value is a Tree.
      // C: The value depends on combinations.
      //D : Is the desahabilitado field
      //I : The value will not be prinitend, has instruccions about the article.
      const readonlyStyle = {
        background: "rgba(0,0,0,0.3)",
        color: "white",
        borderRadius: "5px",
      };

      switch (type) {
        case "S":
          return (
            <td className="hover:max-w-[6rem] max-w-[4rem]  border border-slate-300  text-center ">
              <input
                placeholder={value.placeholder}
                id={`${i}-${key}`}
                onChange={(e) => {
                  handleChange(i, _key, e.target.value);
                }}
                style={value.readonly ? readonlyStyle : {}}
                value={value.data}
                title={value.data}
                readOnly={value.readonly}
                name={`${i}_${key}`}
                className="w-full text-[0.7rem] "
                type={
                  (key === "color" || key === "talla") && value.readonly
                    ? "hidden"
                    : "text"
                }
              />
              {(key === "color" || key === "talla") && (
                <div className="flex flex-col max-h-5 overflow-auto  items-center hover:max-h-14 justify-between">
                  {value.data.split(",").map((word, _i) => (
                    <p key={`${word}-${_i}`}>{word}</p>
                  ))}
                </div>
              )}
            </td>
          );

        case "A":
          return (
            <td className="px-1 max-w-md border  border-slate-300  text-center ">
              <div>
                <input
                  className="border border-slate-300"
                  onChange={(e) => {
                    const strFilter = e.target.value.toLowerCase();
                    const dataFiltered = value.data.filter((obj) =>
                      obj.NOMBRE.toLowerCase().startsWith(strFilter)
                    );
                    setArrayData(dataFiltered);
                  }}
                  type="text"
                />
              </div>
              <select
                name={`${i}_${key}`}
                onChange={(e) => {
                  handleChange(i, _key, e.target.value);
                }}
                className="max-w-[4rem] text-xs "
                value={value.id}
              >
                <option value="">-</option>
                {Array.isArray(arrayData) &&
                  arrayData &&
                  arrayData.map((obj, _i) => {
                    return (
                      <option
                        key={`${i}-${key}-${_i}`}
                        className="w-full pr-2"
                        title={obj.NOMBRE}
                        value={obj.CODIGO}
                      >
                        {obj.NOMBRE}
                      </option>
                    );
                  })}
              </select>
              {/* <input title={key[0] === '%' || key[0] === '#' ? value : null} readOnly name={`${i}-${key}`} className="w-full text-xs" type="text" defaultValue={value} /> */}
            </td>
          );

        case "T":
          // eslint-disable-next-line no-case-declarations
          const tree = printTree(value.data);

          return (
            <td className="px-1 border border-slate-300  text-center ">
              {Array.isArray(tree) && (
                <select
                  onChange={(e) => {
                    handleChange(i, _key, e.target.value);
                  }}
                  id={`${i}-${key}`}
                  name={`${i}_${key}`}
                  className="max-w-[4rem] text-xs"
                  defaultValue={value.id}
                >
                  {tree.map((branch) => {
                    return (
                      <option
                        key={`${i}-${key}-${branch.id}`}
                        className="w-full"
                        value={branch.id}
                      >
                        {branch.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </td>
          );

        case "D":
          return (
            <td className=" min-w-[7rem]   overflow-auto   flex flex-col w-full px-1 border border-slate-300  text-center justify-between relative ">
              {Array.isArray(value.data) && (
                <select
                  onChange={(e) => {
                    if (Array.isArray(desahabilitado)) {
                      setDeshabilitado((prev) => [e.target.value, ...prev]);
                    } else {
                      setDeshabilitado([]);
                    }

                    if (!value.hasOwnProperty("deshab")) {
                      document.getElementById(
                        `${i}-option-${e.target.value}`
                      ).style.display = "none";
                    }
                  }}
                  id={`${i}-${key}`}
                  className="right-[0.02rem] overflow-auto  z-10 h-5 w-full flex flex-col items-center "
                >
                  <option value="" disabled hidden>
                    Select
                  </option>

                  {value.data
                    ? value.data
                        .filter((data) => !desahabilitado.includes(data))
                        .map((data, _i) => {
                          return (
                            <option
                              key={`deshabilitar-${data}-${_i}`}
                              className="w-full"
                              value={data}
                            >
                              {data}
                            </option>
                          );
                        })
                    : null}
                </select>
              )}
              {Array.isArray(desahabilitado) && (
                <ul className="  w-14 flex  gap-[0.1rem] flex-col overflow-auto">
                  {desahabilitado.map((d, _i) => {
                    return (
                      <li
                        key={`deshabilitado-${d}`}
                        className="h-3 overflow-auto text-white flex flex-row items-center gap-1 bg-gray-400 rounded-sm px-0.5"
                      >
                        <button
                          onClick={() => {
                            const remove = desahabilitado.filter(
                              (_d) => _d !== d
                            );

                            setDeshabilitado(remove);

                            if (!value.hasOwnProperty("deshab")) {
                              document.getElementById(
                                `${i}-option-${d}`
                              ).style.display = "block";
                            }
                          }}
                          className="px-0.5 text-center border-r border-r-white "
                        >
                          x
                        </button>
                        <input
                          name={`${i}_${key}_${d}`}
                          type="text"
                          className="text-center m-auto text-[0.4rem]"
                          readOnly
                          value={d}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </td>
          );

        case "C":
          return (
            <td className=" max-w-[5rem] h-10 overflow-auto px-1 border border-slate-300  text-center ">
              <div
                id={`${i}-${key}`}
                className="w-full h-full hover:h-14 items-center overflow-auto flex-col justify-center"
              >
                {value.data.map((data, _i) => {
                  if (key === "codbar") {
                    return (
                      <input
                        onChange={(e) => {
                          handleChange(i, _key,`${_i}_${data.VALORCARACT}_${e.target.value}`);
                        }}
                        key={`${i}-${key}_${data.VALORCARACT}`}
                        title={data.VALORCARACT}
                        name={`${i}_${key}_${data.VALORCARACT}`}
                        className="w-10 max-h-2 mr-2"
                        type="text"
                        placeholder={data.VALORCARACT}
                        defaultValue={data.CODBARRAS}
                      />
                    );
                  }
                  return (
                    <input
                    onChange={(e) => {
                      handleChange(i, _key,`${_i}_${data.VALORCARACT}_${e.target.value}`);
                    }}
                      key={`${i}-${key}_${data.VALORCARACT}`}
                      title={data.VALORCARACT}
                      name={`${i}_${key}_${data.VALORCARACT}`}
                      className="w-10 max-h-2"
                      type="text"
                      placeholder={data.VALORCARACT}
                      defaultValue={data.PRECIO}
                    />
                  );
                })}
              </div>
            </td>
          );

        case "I":
          return (
            <input
              name={`${i}_${"isInsert"}`}
              type="hidden"
              value={value.isInsert}
            />
          );

        default:
          return (
            <td className=" W-10 px-1 border border-slate-300  text-center ">
              <div className="overflow-auto">
                <input
                  title={value}
                  readOnly
                  name={`${i}_${key}`}
                  className="w-full  text-[0.7rem]"
                  type="text"
                  defaultValue={value}
                />
              </div>
            </td>
          );
      }
    } catch (error) {
      console.log(error);
    }
  };
  try {
    return renderTd(_key, value, i);
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
}
