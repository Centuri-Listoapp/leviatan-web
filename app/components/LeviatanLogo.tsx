import React from "react";
import { EyeIcon } from "./icons/LandingIcons";

type Props = {
  size?: number;
  showText?: boolean;
  className?: string;
};

const LeviatanLogo = ({ size = 28, showText = true, className }: Props) => {
  return (
    <span className={`lv-logo ${className ?? ""}`}>
      <EyeIcon size={size} className="lv-logo-icon" />
      {showText && <span className="lv-logo-text">Leviatán</span>}
    </span>
  );
};

export default LeviatanLogo;
