import useAjax from "./useAjax";
import { useNavigate } from "react-router-dom";
import { useCompany as useCompanyContext } from "../Context/ContextProvider";
import ls from "localstorage-slim";
import { useEffect, useState } from "react";



export function useLogin() {
    const [data, error, isPending, setConfig] = useAjax();
    const navigate = useNavigate();
    const login = (e, form) => {
        e.preventDefault()
        setConfig("/api/login", form, "POST");
    };

    useEffect(() => {
        if (data && !error) {
          
            ls.config.encrypt = true;
            ls.set("USER", data.data.user.id);
            ls.set("ACCESS_TOKEN", data.data.token);
            navigate("/middle");
        }
        if (error) {
           
        }
    }, [data, error]);

    return [data, error, isPending, login];
}

export function useLogout() {
    const [data, error, isPending, setConfig] = useAjax("/api/logout", "POST");

    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        setConfig("/api/logout", {
            logout: true,
        }, "POST");
    };

    useEffect(() => {
        if (data || error) {
            ls.remove("USER");
            ls.remove("ACCESS_TOKEN");
            navigate("/login");
            return
        }
    }, [data, error]);

    return logout;
}
