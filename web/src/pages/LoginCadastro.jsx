import React from "react";
import { LoginECadastro } from "./LoginECadastro";
import "./../styles/LoginCadastro.css";

export const LoginCadastro = () => {
  return (
    <div className="logi-cadastro">
      <div className="div-3">
        <div className="SEDUC-escolas">
          SEDUC
          <br />
          Escolas
        </div>
        <LoginECadastro className="login-e-cadastro-instance" property1="default" />
      </div>
    </div>
  );
};
