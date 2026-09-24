export default function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 410 34"
      width="410"
      height="34"
      role="img"
      aria-label="doasfrancisco"
    >
      <text
        x="0"
        y="30"
        textLength="410"
        lengthAdjust="spacing"
        fontFamily="'Trebuchet MS', Verdana, 'DejaVu Sans', sans-serif"
        fontSize="40"
        fontWeight="normal"
        fill="#f8f8fd"
        transform="scale(1 1.12)"
      >
        DOASFRANCISCO
      </text>
    </svg>
  );
}
