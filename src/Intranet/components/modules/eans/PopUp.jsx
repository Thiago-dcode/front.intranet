
import { useEffect, useState } from "react";
import IsPending from "../../../../components/pending/IsPending";
export default function PopUp({ show, setShow, id, isPending, message, handleCancel,handleConfirm, confirmMessage }) {

    const handleSubmit = (e) => {

        e.preventDefault()
        const btn = e.nativeEvent.submitter;


        if (btn.name === 'cancelar') {
            handleCancel()
            return
        }
        handleConfirm()

    }


    return (
        <>

            {show && <div className="flex w-screen h-screen items-center justify-center absolute -top-1/3  left-0 z-[99] ">
                <form id={id} onSubmit={(e) => {

                    handleSubmit(e)

                }} className=" w-80 flex flex-col items-center justify-between  p-2 border  border-black bg-black/80 text-white rounded-md">

                    <h1 className="text-center font-semibold text-lg">{message}</h1>
                    {!isPending ? <div className="flex items-center gap-10 mt-4">
                        <button className="bg-red-500 px-2 py-1  border rounded-md " name="cancelar" type="submit">Cancelar</button>
                        <button className="bg-bera-textil px-2 py-1  border rounded-md" name="confirmar" type="submit">Confirmar</button>

                    </div> : <div className="flex items-center gap-10 mt-4"><IsPending size="25"/></div>}



                </form>
            </div>}

        </>
    );
}
