/* eslint-disable react-hooks/exhaustive-deps */

// import Icon from '../../components/icon/Icon';
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
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                setSuccess(true);
            }
            return;
        }
        if (error) {
            if (!error.hasOwnProperty(errors)) return
            setErrors(prev => [...Object.entries(error?.errors).map(([, value]) => value), ...prev])
        }
    }, [data, error]);
    return (
        <div className="mt-20 flex items-center justify-center flex-col gap-2">
            <form
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

                {!isPending ? (
                    <Button
                        type="submit"
                        color={"black"}
                        bgColor={company.color}
                        content="Importar"
                    />
                ) : (
                    <>
                        {" "}
                        {isPending ? <IsPending size="25" color={company.color} /> : null}
                    </>
                )}
                {errors &&
                    errors.map((er, i) => {
                        return (
                            <Error
                                className="bg-red-500 text-white px-1 rounded-md text-xs"
                                key={`${i}-error-importArt`}
                                message={er}
                            />
                        );
                    })}
            </form>
        </div>
    );
}
