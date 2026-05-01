'use client';
// components/ApertureIcon.jsx

export default function ApertureIcon({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="18" stroke="#e8720c" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="6" fill="#e8720c" opacity="0.9" />
      <path d="M20 2 L20 14 M20 26 L20 38" stroke="#e8720c" strokeWidth="1.5" />
      <path d="M2 20 L14 20 M26 20 L38 20" stroke="#e8720c" strokeWidth="1.5" />
      <path d="M5.4 5.4 L13.5 13.5 M26.5 26.5 L34.6 34.6" stroke="#e8720c" strokeWidth="1.5" />
      <path d="M34.6 5.4 L26.5 13.5 M13.5 26.5 L5.4 34.6" stroke="#e8720c" strokeWidth="1.5" />
    </svg>
  );
}
