import PropTypes from "prop-types";
import React from "react";
import { Senha } from "./Senha";
import { UsuRio } from "./UsuRio";
import "./styles/LoginECadastro.css";

export const LoginECadastro = ({ property1, className }) => {
  return (
    <div className={`login-e-cadastro ${className}`}>
      <div className={`dd property-1-0-${property1}`}>
        {property1 === "default" && (
          <div className="overlap">
            <div className="group">
              <div className="overlap-group">
                <div className="text-wrapper-3">Entrar</div>
              </div>
            </div>
            <Senha className="senha-instance" property1="default" />
            <div className="overlap-2">
              <UsuRio className="usu-rio-instance" divClassName="instance-node" property1="default" text="CPF" />
              <div className="pe-direito">
                <div className="rectangle-3" />
              </div>
            </div>
            <div className="div-wrapper">
              <div className="text-wrapper-4">Cadastro</div>
            </div>
            <div className="overlap-3">
              <div className="rectangle-wrapper">
                <div className="rectangle-4" />
              </div>
              <div className="text-wrapper-5">Entrar</div>
            </div>
          </div>
        )}

        {property1 === "variant-2" && (
          <>
            <div className="overlap-wrapper">
              <div className="overlap">
                <div className="overlap-group-wrapper">
                  <div className="overlap-group-2">
                    <div className="text-wrapper-6">Cadastrar</div>
                  </div>
                </div>
                <Senha className="senha-instance" property1="default" />
                <UsuRio className="usu-rio-2" divClassName="instance-node" property1="default" text="CPF" />
                <div className="overlap-4">
                  <div className="text-wrapper-7">Entrar</div>
                </div>
                <div className="overlap-5">
                  <div className="group-2">
                    <div className="rectangle-5" />
                  </div>
                  <div className="text-wrapper-8">Cadastro</div>
                </div>
              </div>
            </div>
            <div className="pe-esquerdo">
              <div className="rectangle-6" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

LoginECadastro.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};