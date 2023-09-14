import PropTypes from "prop-types";
import React from "react";
import "./Etiqueta.css";

export const Etiqueta = ({ className, divClassName, text = "Nome" }) => {
  return (
    <div className={`etiqueta ${className}`}>
      <div className={`nome ${divClassName}`}>{text}</div>
    </div>
  );
};

Etiqueta.propTypes = {
  text: PropTypes.string,
};
