import React from 'react'

export const Clock = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" color={`${props.color ? props.color : 'none'}`} className={`${props.font === "small" ? "w-4 h-4" : "w-6 h-6"}`}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

  )
}
