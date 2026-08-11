"use client";
import React from "react";

const LinkPrivacyPolicy = () => {
  const goPolicy = () => {
    window.open("./policy", "_blank");
  };

  return (
    <strong className="term-link" onClick={() => goPolicy()}>
      Política de privacidad
    </strong>
  );
};

export default LinkPrivacyPolicy;
