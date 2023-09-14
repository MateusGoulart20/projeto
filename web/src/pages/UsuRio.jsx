import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./../styles/UsuRio.css";

export const UsuRio = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`usu-rio ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="div">
        <div className={`rectangle ${state.property1}`}>
          {state.property1 === "variant-3" && (
            <>
              <div className="rectangle-2" />
              <div className="text-wrapper">Usuário</div>
            </>
          )}
        </div>
        <div className={`div-2 property-1-${state.property1}`}>
          {["default", "variant-2"].includes(state.property1) && <>Usuário</>}

          {state.property1 === "variant-3" && <>Roberto Nogueira</>}
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

UsuRio.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
};
