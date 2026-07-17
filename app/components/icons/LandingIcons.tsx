import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const EyeIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10.5" {...base} />
    <circle cx="12" cy="12" r="6.5" {...base} />
    <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
  </svg>
);

export const FlagMountainIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M3 20 L9 8 L12.5 14 L15 10 L21 20 Z" {...base} />
    <path d="M9 8 L9 3" {...base} />
    <path d="M9 3 L14.5 4.6 L9 6.2 Z" {...base} />
  </svg>
);

export const TelescopeIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M3 17 L14 9" {...base} />
    <path d="M4.5 19.5 L6.5 16" {...base} />
    <rect x="12.3" y="6.4" width="8.5" height="4.4" rx="1" transform="rotate(28 16.5 8.6)" {...base} />
    <circle cx="20.2" cy="6" r="1.3" {...base} />
    <path d="M9 18 L15 18" {...base} />
  </svg>
);

export const UsersIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="9" cy="8" r="3" {...base} />
    <path d="M3.5 20 C3.5 15.8 6 14 9 14 C12 14 14.5 15.8 14.5 20" {...base} />
    <circle cx="17" cy="9" r="2.4" {...base} />
    <path d="M15 14.2 C17.6 14.2 20.5 15.6 20.5 19.4" {...base} />
  </svg>
);

export const PieChartIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M12 3 A9 9 0 1 1 5 18" {...base} />
    <path d="M12 3 L12 12 L20 12" {...base} />
  </svg>
);

export const BarChartIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M4 20 L4 12" {...base} />
    <path d="M11 20 L11 7" {...base} />
    <path d="M18 20 L18 10" {...base} />
    <path d="M3 20 L21 20" {...base} />
    <path d="M4 12 L11 7 L18 10 L21 6" {...base} />
  </svg>
);

export const HandshakeIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M2 12 L6 9 L10 11.5" {...base} />
    <path d="M22 12 L18 9 L14.5 11.2" {...base} />
    <path d="M6 9 L11 13.5 C12 14.4 13.4 14.2 14.1 13.2 L18 9" {...base} />
    <path d="M9 12.5 L10.8 14 C11.6 14.7 12.9 14.5 13.5 13.7" {...base} />
  </svg>
);

export const TargetIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="9" {...base} />
    <circle cx="12" cy="12" r="5" {...base} />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const RocketIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M12 2 C15 4.5 16.5 8.5 15.6 13 L8.4 13 C7.5 8.5 9 4.5 12 2 Z" {...base} />
    <circle cx="12" cy="8.5" r="1.5" {...base} />
    <path d="M8.4 13 L5.5 16 L8.6 15.3" {...base} />
    <path d="M15.6 13 L18.5 16 L15.4 15.3" {...base} />
    <path d="M10 15.5 L9 21 L12 18.8 L15 21 L14 15.5" {...base} />
  </svg>
);

export const EnvelopeIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" {...base} />
    <path d="M3.5 6.5 L12 13 L20.5 6.5" {...base} />
  </svg>
);

export const PhoneIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M5 3.5 L9 3.5 L10.5 8 L8 9.5 C9 12.5 11.5 15 14.5 16 L16 13.5 L20.5 15 L20.5 19 C20.5 20 19.7 20.7 18.7 20.6 C10.8 19.9 4.1 13.2 3.4 5.3 C3.3 4.3 4 3.5 5 3.5 Z" {...base} />
  </svg>
);

export const NetworkIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="4.5" r="2" {...base} />
    <circle cx="5" cy="18" r="2" {...base} />
    <circle cx="19" cy="18" r="2" {...base} />
    <circle cx="12" cy="12" r="2" {...base} />
    <path d="M12 6.5 L12 10" {...base} />
    <path d="M10.5 13.2 L6.3 16.5" {...base} />
    <path d="M13.5 13.2 L17.7 16.5" {...base} />
  </svg>
);

export const CheckCircleIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="9.5" {...base} />
    <path d="M8 12.3 L10.7 15 L16 9" {...base} />
  </svg>
);
