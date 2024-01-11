/* eslint-disable react-hooks/exhaustive-deps */

// import Icon from '../../components/icon/Icon';
import { useNavigate } from 'react-router-dom';
import { useCompany } from "../../../Context/ContextProvider";
import useAjax from '../../../hooks/useAjax';
import { useEffect, useState } from 'react';
import Error from '../../../components/error/Error';
import Button from '../../components/button/Button';
export default function ImportArticulos() {
    const navigate = useNavigate();
    const company = useCompany();
    const [data, error, isPending, setConfig] = useAjax();
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([])


    const handleSubmit = (e) => {

        e.preventDefault()
        setErrors([])
        if (!file) return

        if (file?.type !== 'text/plain') {

            setErrors(prev => ['El archivo debe ser de tipo texto!', ...prev])
            return
        }

      
    
        setConfig(`/api/${company.name}/modules/importArticulos`, {file}, 'POST')
    }




    useEffect(() => {
        if (!company) {

            navigate('/bienvenido')
        }
     
    }, [company, navigate])

    // useEffect(() => {
    //     if (!url) return
    //     setConfig("/api/" + url, [], "GET");
    // }, [url])
    useEffect(() => {
        if (data && !error) {

            console.log(data)
            return
        }
        if (error) {
            console.log(error)
        }

    }, [data, error])
    return <div className='mt-20 flex items-center justify-center flex-col gap-2'>

        <form className='flex items-center justify-center flex-col gap-2' onSubmit={(e) => {
            handleSubmit(e)
        }} action="">

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Carga el documento de texto</label>
            <input onChange={(e) => {
                if (!e.target.files) return
                setFile(e.target.files[0])
            }} name='file' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"></input>



            <Button type='submit' content='Importar' />
        </form>
        {errors && errors.map((er, i) => {

            return <Error className='bg-red-500 text-white px-1 rounded-md text-xs' key={`${i}-error-importArt`} message={er} />
        })}

    </div>;
}