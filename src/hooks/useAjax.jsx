import { useEffect, useState } from "react";
import ls from "localstorage-slim";
import Api from "../api/Api";
import { Form, useNavigate } from "react-router-dom";

export default function useAjax(
  url = "",
  method = "GET",
  formData = {},
  config = {},
  headers = {},
) {

  const navigate = useNavigate();
  const [_data, setData] = useState(null);

  const [error, setError] = useState(null);

  const [isPending, setIsPending] = useState(false);
  const [_url, _setUrl] = useState(url);
  const [form, setForm] = useState(formData);
  const [_method, setMethod] = useState(method)



  const setConfig = (__url = '', form = null, method = 'GET') => {

    if (__url) _setUrl(__url);
    if (form) setForm(form);
    if (method) setMethod(method);


  }
  const ajax = async (signal) => {

    setError("");
    setIsPending(true);
    try {

      if (_url === "/api/login") {

        const response = await Api.get("/sanctum/csrf-cookie");
		  console.log(response);

        }
      if (import.meta.env.DEV) {
        console.log(form)
      }

      const { data } = await Api({
        method: _method ,
        url: _url,
        data: form,
        headers: { ...headers,...signal },
        params: { ...config },
      });

      setData(data);

    } catch (error) {
      setError(error?.response?.data);

      if (import.meta.env.DEV) {

        console.error("UseAjax.jsx Error:", error);
      }
      console.error("UseAjax.jsx Error:", error);

    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {

    if (!_url) return;

    if (
      (_method === "POST" || _method === "PATCH") &&
      !(Object.keys(form).length)
    )
      return;

    const controller = new AbortController();
    const signal = controller.signal;
    ajax(signal);
  }, [_url, form, _method]);

  useEffect(() => {
    if (!_data && error) {
      if (error.status === 401) {
        ls.clear()
        navigate('/login')
        return

      }
    }
  }, [_data, error]);

  return [_data, error, isPending, setConfig];
}
