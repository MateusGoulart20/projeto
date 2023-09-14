import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./../styles/Senha.css";

export const Senha = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`senha ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="div">
        <div className={`rectangle ${state.property1}`}>
          {state.property1 === "variant-3" && (
            <>
              <div className="rectangle-2" />
              <div className="text-wrapper">Senha</div>
            </>
          )}
        </div>
        <div className={`div-2 property-1-${state.property1}`}>
          {["default", "variant-2"].includes(state.property1) && <>Senha</>}

          {state.property1 === "variant-3" && <>***************</>}
        </div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "variant-2",
        };
    default: return state.property1
    }
  }

  if (state.property1 === "variant-2") {
    switch (action) {
      case "click":
        return {
          property1: "variant-3",
        };
        default: return state.property1
    }
  }

  if (state.property1 === "variant-3") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
        default: return state.property1
    }
  }

  return state;
}

Senha.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
};