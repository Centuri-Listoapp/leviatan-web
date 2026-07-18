import React from "react";
import { LeviatanMarkIcon } from "./icons/LandingIcons";
import "./LeviatanLogo.css";

type Props = {
  size?: number;
  className?: string;
};

const LeviatanLogo = ({ size = 34, className }: Props) => {
  return (
    <span className={`lv-logo ${className ?? ""}`}>
      <LeviatanMarkIcon size={size} className="lv-logo-icon" />
      <span className="lv-logo-text">Leviatán</span>
    </span>
  );
};

export default LeviatanLogo;
