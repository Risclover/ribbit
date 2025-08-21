import "./FrogLoader.css";

export const FrogLoader = () => (
  <div className="frog-loader" role="status" aria-label="Loading">
    <svg
      className="frog"
      viewBox="0 0 120 120"
      width="120"
      height="120"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="70" rx="32" ry="22" fill="#63b64d" />
      <path d="M28 73 Q10 80 20 92 Q28 88 28 73" fill="#4f9a3a" />
      <path d="M92 73 Q110 80 100 92 Q92 88 92 73" fill="#4f9a3a" />
      <circle cx="46" cy="46" r="12" fill="#fff" />
      <circle cx="46" cy="46" r="6" fill="#222" />
      <circle cx="74" cy="46" r="12" fill="#fff" />
      <circle cx="74" cy="46" r="6" fill="#222" />
      <path d="M45 63 Q60 72 75 63" stroke="#222" strokeWidth="3" fill="none" />
    </svg>

    <div className="frog-shadow"></div>
  </div>
);
