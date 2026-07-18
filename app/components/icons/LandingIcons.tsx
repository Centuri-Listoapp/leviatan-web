import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const LeviatanMarkIcon = ({ size = 24, className }: IconProps) => (
  <svg
    width={size * 1.67}
    height={size}
    viewBox="0 0 100 60"
    fill="none"
    className={className}
  >
    <path
      d="M6,30 C6,30 22,6 50,6 C78,6 94,30 94,30 C94,30 78,54 50,54 C22,54 6,30 6,30 Z"
      stroke="currentColor"
      strokeWidth={4.2}
      strokeLinejoin="round"
    />
    <circle
      cx="50"
      cy="30"
      r="17"
      stroke="currentColor"
      strokeWidth={4.2}
      strokeDasharray="9 4.35"
    />
    <rect x="35.6" y="26" width="3.2" height="8" rx="1.6" fill="currentColor" />
    <rect x="42" y="23" width="3.2" height="14" rx="1.6" fill="currentColor" />
    <rect x="48.4" y="20" width="3.2" height="20" rx="1.6" fill="currentColor" />
    <rect x="54.8" y="23" width="3.2" height="14" rx="1.6" fill="currentColor" />
    <rect x="61.2" y="26" width="3.2" height="8" rx="1.6" fill="currentColor" />
  </svg>
);

export const MissionIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M5 3v18" {...base} />
    <path d="M5 4h10l-2 3 2 3H5" {...base} />
    <path d="M9 18l4-3" {...base} />
  </svg>
);

export const VisionIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M3 12l7-3 4 4 7-9" {...base} />
    <circle cx="12" cy="12" r="9" {...base} />
  </svg>
);

export const PersonFilledIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);

export const MicIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M12 1v6m0 6v10" {...base} />
    <rect x="9" y="2" width="6" height="13" rx="3" {...base} />
    <path d="M5 10a7 7 0 0014 0" {...base} />
  </svg>
);

export const OrgChartIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="6" r="2.4" {...base} />
    <circle cx="5" cy="17" r="2.4" {...base} />
    <circle cx="19" cy="17" r="2.4" {...base} />
    <path d="M12 8.4V13m0 0l-5 3m5-3l5 3" {...base} />
  </svg>
);

export const ClockIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="9" {...base} />
    <path d="M12 3v9l6 3" {...base} />
  </svg>
);

export const BarsIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M4 19V9m6 10V5m6 14v-7" {...base} />
    <path d="M3 19h18" {...base} />
  </svg>
);

export const PeopleIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="8" cy="9" r="3" {...base} />
    <circle cx="17" cy="9" r="3" {...base} />
    <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M13 14c3.3 0 6 2.7 6 6" {...base} />
  </svg>
);

export const TargetIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="9" {...base} />
    <circle cx="12" cy="12" r="4.2" {...base} />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const RocketIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" {...base} />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" {...base} />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" {...base} />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" {...base} />
  </svg>
);

export const EnvelopeIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" {...base} />
    <path d="M3 6l9 7 9-7" {...base} />
  </svg>
);

export const PhoneIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" {...base} />
  </svg>
);
