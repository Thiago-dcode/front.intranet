import React, { useEffect, useState } from "react";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import { useLogin } from "../hooks/useAuth";
import { maxWords } from "../utils/Utils";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [data, error, isPending, login] = useLogin();


  return (
    <div className="mt-14">


      <Form
        title="Iniciar sesión"
        handleSubmit={(e) => {
          login(e, { email, password })
        }}
        elements={[
          <Input
            id={"email-input-login"}
            type="text"
            handleInput={setEmail}
            value={email}
            name="Email"
          />,
          <Input
            id={"password-input-login"}
            type="password"
            handleInput={setPassword}
            value={password}
            name="Contraseña"
          />,
        ]}
        error={error?.message}
        isPending={isPending}
        buttonText="Iniciar sesión"
      />
    </div>
  );
}
