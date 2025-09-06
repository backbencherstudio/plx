import React from 'react'

interface MessageIconProps {
  color?: string;
}

export default function MessageIcon({ color = "#777980" }: MessageIconProps) {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M5.33268 8.3314H10.3327M5.33594 4.99988L7.666 4.99805" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.3322 1.33334H2.66667C1.93029 1.33334 1.33333 1.9303 1.33333 2.66668V10.6647C1.33333 11.4011 1.93029 11.9981 2.66667 11.9981H3.99935V13.3555C3.99935 13.9004 4.61749 14.2151 5.05813 13.8947L7.666 11.9981H13.3322C14.0686 11.9981 14.6655 11.4011 14.6655 10.6647V2.66668C14.6655 1.9303 14.0686 1.33334 13.3322 1.33334Z" stroke={color} stroke-width="1.5" stroke-linejoin="round"/>
</svg>
  )
}
