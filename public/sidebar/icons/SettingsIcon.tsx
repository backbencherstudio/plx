import React from 'react'

interface SettingsIconProps {
  color?: string;
}

export default function SettingsIcon({ color = "#777980" }: SettingsIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M2 6.07334V9.92001C2 11.3333 2 11.3333 3.33333 12.2333L7 14.3533C7.55333 14.6733 8.45333 14.6733 9 14.3533L12.6667 12.2333C14 11.3333 14 11.3333 14 9.92668V6.07334C14 4.66668 14 4.66668 12.6667 3.76668L9 1.64668C8.45333 1.32668 7.55333 1.32668 7 1.64668L3.33333 3.76668C2 4.66668 2 4.66668 2 6.07334Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}
