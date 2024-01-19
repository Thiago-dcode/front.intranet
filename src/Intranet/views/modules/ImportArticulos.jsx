/* eslint-disable react-hooks/exhaustive-deps */

// import Icon from '../../components/icon/Icon';
import Success from "../../components/popup/Success";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../../Context/ContextProvider";
import useAjax from "../../../hooks/useAjax";
import IsPending from "../../../components/pending/IsPending";
import { useEffect, useState } from "react";
import Error from "../../../components/error/Error";
import Button from "../../components/button/Button";
export default function ImportArticulos() {
    const navigate = useNavigate();
    const company = useCompany();
    const [data, error, isPending, setConfig] = useAjax();
    const [file, setFile] = useState([]);
    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(null);
        setErrors([]);
        if (!file) {
            setErrors((prev) => [
                "Debes seleccionar el documento de texto a importar",
                ...prev,
            ]);

            return;
        }

        if (file?.type !== "text/plain") {
            e.target.file.value = null;
            setErrors((prev) => ["El archivo debe ser de tipo texto!", ...prev]);
            setFile(null);
            return;
        }

        setConfig(`/api/${company.name}/modules/importArticulos`, { file }, "POST");
    };

    useEffect(() => {
        if (!company) {
            navigate("/bienvenido");
        }
    }, [company, navigate]);

    useEffect(() => {
        if (data && !error) {
            if (data.status === 200) {
                setFile(null)
                console.log(data)
                setResult(data?.data);
            }
            return;
        }
        if (error) {
            setFile(null)
            console.log(error)
            setResult(null);
            if (!error?.data.errors) return

            setErrors(prev => [...Object.entries(error?.data?.errors).map(([, value]) => value), ...prev])
        }
    }, [data, error]);
    return (
        <div className="mt-20 w-full flex items-center justify-center flex-col gap-2">
            {!isPending ? <form
                className="flex items-center justify-center flex-col gap-2"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
                action=""
            >
                <label className="block mb-2 text-sm font-medium " htmlFor="file_input">
                    Carga el documento de texto
                </label>
                <input
                    onChange={(e) => {
                        if (!e.target.files) return;
                        setErrors([])
                        setFile(e.target.files[0]);
                    }}
                    name="file"
                    className="block  w-52 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                ></input>


                <Button
                    type="submit"
                    color={"black"}
                    bgColor={company.color}
                    content="Importar"
                />

                {errors &&
                    errors.map((er, i) => {
                        return (
                            <Error
                                className="bg-red-400 text-white px-1 rounded-md text-xs"
                                key={`${i}-error-importArt`}
                                message={er}
                            />
                        );
                    })}
            </form> : (
                <>
                    {" "}
                    {isPending ? <IsPending size="25" color={company.color} /> : null}
                </>
            )}
            {result !== null ? <div className="mt-4 w-full flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-4 border-b border-b-black  px-7 mb-2">

                    <div className="flex flex-col items-center ">
                        <p>artículos</p>
                        <span className="ml-2">{result?.total}</span>
                    </div>
                    <div className="flex flex-col items-center ">
                        <p>errores</p>
                        <span className="ml-2 text-white bg-red-400 border-1 rounded-md px-1">{result?.error}</span>
                    </div>
                    <div className="flex flex-col items-center ">
                        <p>avisos</p>
                        <span className="ml-2 text-white bg-orange-400 border-1 rounded-md px-1">{result?.warning}</span>
                    </div>
                    <div className="flex flex-col items-center ">
                        <p>update</p>
                        <span className="ml-2  text-black bg-yellow-400 border-1 rounded-md px-1 ">{result?.update}</span>
                    </div>
                    <div className="flex flex-col items-center  m-1 ">
                        <p>inserts</p>
                        <span className="ml-2  text-black bg-green-400 border-1 rounded-md px-1">{result?.insert}</span>
                    </div>
                </div>

                {Array.isArray(result?.messages) && result?.messages.length > 0 && <div className="flex flex-col gap-1 items-center justify-center">
                    {result?.messages.filter(msg => msg.type !== 'debug').map((msg, i) => {
                        let color = ''
                        let txt = ''
                        switch (msg.type) {

                            case 'error':
                                color = 'bg-red-400'
                                txt = 'text-white'
                                break;
                            case 'update':
                                color = 'bg-yellow-400'
                                txt = 'text-black'
                                break;
                            case 'insert':
                                color = 'bg-green-400'
                                txt = 'text-white'
                                break;
                            case 'warning':
                                color = 'bg-orange-400'
                                txt = 'text-black'
                                break;
                            default:
                                break;
                        }
                        return <p className={`font-bold ${txt} ${color} px-2 py-1 rounded-md  text-xs`} key={`message-${i}-${msg}`}>{msg.message}</p>

                    })}
                </div>}

            </div> : null}
        </div>
    );
}
