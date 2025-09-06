import React from 'react'

interface DashboardIconProps {
  color?: string;
}

export default function DashboardIcon({ color = "#777980" }: DashboardIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M3.33281 6.66683H4.66615C5.99948 6.66683 6.66615 6.00016 6.66615 4.66683V3.3335C6.66615 2.00016 5.99948 1.3335 4.66615 1.3335H3.33281C1.99948 1.3335 1.33281 2.00016 1.33281 3.3335V4.66683C1.33281 6.00016 1.99948 6.66683 3.33281 6.66683Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.3328 6.66683H12.6661C13.9995 6.66683 14.6661 6.00016 14.6661 4.66683V3.3335C14.6661 2.00016 13.9995 1.3335 12.6661 1.3335H11.3328C9.99948 1.3335 9.33281 2.00016 9.33281 3.3335V4.66683C9.33281 6.00016 9.99948 6.66683 11.3328 6.66683Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.3328 14.6668H12.6661C13.9995 14.6668 14.6661 14.0002 14.6661 12.6668V11.3335C14.6661 10.0002 13.9995 9.3335 12.6661 9.3335H11.3328C9.99948 9.3335 9.33281 10.0002 9.33281 11.3335V12.6668C9.33281 14.0002 9.99948 14.6668 11.3328 14.6668Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.33281 14.6668H4.66615C5.99948 14.6668 6.66615 14.0002 6.66615 12.6668V11.3335C6.66615 10.0002 5.99948 9.3335 4.66615 9.3335H3.33281C1.99948 9.3335 1.33281 10.0002 1.33281 11.3335V12.6668C1.33281 14.0002 1.99948 14.6668 3.33281 14.6668Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}