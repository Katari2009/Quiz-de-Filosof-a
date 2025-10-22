
import React from 'react';

export const OwlIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
    <path d="M15.5 6.5c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5c.75 0 1.3-.33 1.7-.8"></path>
    <path d="M8.5 6.5c1.5 0 2.5 1 2.5 2.5S10 11.5 8.5 11.5c-.75 0-1.3-.33-1.7-.8"></path>
    <path d="M12 12v3"></path>
    <path d="M10 15h4"></path>
  </svg>
);
