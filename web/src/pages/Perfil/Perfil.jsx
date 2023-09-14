import React from "react";
import { Etiqueta } from "../Generico/Etiqueta";
import { Header } from "../Generico/Header";
import "./style/Perfil.css";

export const Perfil = () => {
  return (
    <div className="perfil">
      <Header apps="apps-2.svg" text="Perfil" vector="image.svg" />
      <div className="frame">
        <div className="group">
          <div className="div">
            <div className="group-2">
              <div className="rectangle" />
              <div className="text-wrapper">Senha Nova</div>
            </div>
            <div className="group-3">
              <div className="rectangle" />
              <div className="text-wrapper">Senha Atual</div>
            </div>
          </div>
          <Etiqueta className="etiqueta-instance" divClassName="design-component-instance-node" text="Alterar Senha" />
        </div>
        <Etiqueta className="etiqueta-2" divClassName="design-component-instance-node" text="Apagar Conta" />
      </div>
    </div>
  );
};
