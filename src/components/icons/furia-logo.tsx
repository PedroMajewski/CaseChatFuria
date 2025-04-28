import type { SVGProps } from 'react';

export function FuriaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100" // Example viewbox, adjust if you have the real SVG
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Placeholder path - Replace with actual Furia logo SVG path data */}
      <path d="M20 80 L50 20 L80 80 Z" strokeWidth="5" fill="currentColor" />
      <path d="M35 80 L50 50 L65 80" strokeWidth="3" stroke="hsl(var(--background))" />
       <title>FURIA Logo</title>
       img
    </svg>
  );
}
