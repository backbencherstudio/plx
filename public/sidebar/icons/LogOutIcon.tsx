import React from 'react'

interface LogOutIconProps {
  color?: string;
}

export default function LogOutIcon({ color = "#EB3D4D" }: LogOutIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M9.33333 12.3333L9.09467 13.0494C8.85933 13.7554 8.09167 14.1321 7.38927 13.8863L3.3393 12.4687C2.53713 12.188 2 11.4309 2 10.5811V5.41896C2 4.56907 2.53713 3.81201 3.3393 3.53125L7.38927 2.11375C8.09167 1.86792 8.85933 2.24462 9.09467 2.9506L9.33333 3.66667" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.3327 6.3335L13.9993 8.00016L12.3327 9.66683M6.66602 8.00016H13.5935" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}
