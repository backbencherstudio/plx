import React from 'react'

interface NominationIconProps {
  color?: string;
}

export default function NominationIcon({ color = "#777980" }: NominationIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M14 6.24074V10.6667C14 12.8758 12.2091 14.6667 10 14.6667H6C3.79086 14.6667 2 12.8758 2 10.6667V5.33333C2 3.12419 3.79086 1.33333 6 1.33333H8.96429" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.33333 4.66667H8" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
  <path d="M5.33333 8H10.6667" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
  <path d="M5.33333 11.3333H10.6667" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 1.33333V5.33333" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
  <path d="M14 3.33333L10 3.33333" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
</svg>
  )
}
