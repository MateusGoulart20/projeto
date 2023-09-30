import React from "react";
import { Header } from "../Generico/Header";
import "./styles/Esttistica.css";

export const Esttistica = () => {
  return (
    <div className="esttistica">
      <Header apps="apps-2.svg" text="Estatística" vector="image.svg" />
      <div className="frame">
        <div className="div-wrapper">
          <div className="div">
            <img className="titulo" alt="Titulo" src="image.png" />
            <img className="group" alt="Group" src="group-27-2.png" />
            <img className="group" alt="Group" src="group-28-2.png" />
            <img className="group" alt="Group" src="group-29-2.png" />
            <img className="group" alt="Group" src="group-30-2.png" />
            <img className="group" alt="Group" src="group-31-2.png" />
            <img className="group" alt="Group" src="group-32-2.png" />
            <img className="graficos-em-barra" alt="Graficos em barra" src="graficos-em-barra.png" />
          </div>
        </div>
        <div className="div-wrapper">
          <div className="div">
            <img className="img" alt="Titulo" src="titulo.png" />
            <img className="group" alt="Group" src="group-26.png" />
            <img className="group" alt="Group" src="group-27.png" />
            <img className="group" alt="Group" src="group-28.png" />
            <img className="group" alt="Group" src="group-29.png" />
            <img className="group" alt="Group" src="group-30.png" />
            <img className="group" alt="Group" src="group-31.png" />
            <img className="group-2" alt="Group" src="group-32.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
