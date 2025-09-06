import React from 'react'

interface SchedualIconProps {
  color?: string;
}

export default function SchedualIcon({ color = "#777980" }: SchedualIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_6281_268)">
    <path d="M4.375 0.625V3.125M10.625 0.625V3.125M6.14697 14.375H3.125C1.74431 14.375 0.625 13.2557 0.625 11.875V4.375C0.625 2.99422 1.74431 1.875 3.125 1.875H11.875C13.2557 1.875 14.375 2.99422 14.375 4.375V5.625H0.625" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.625 15.375C13.6961 15.375 15.375 13.6961 15.375 11.625C15.375 9.55393 13.6961 7.875 11.625 7.875C9.55393 7.875 7.875 9.55393 7.875 11.625C7.875 13.6961 9.55393 15.375 11.625 15.375Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.625 10.375V11.625H12.875" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_6281_268">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>
  )
}
