import React from 'react'

export default function Error({className = 'bg-red-500 text-white px-1 rounded-md', message, id=''}) {
  return (
    <div id ={id} className={className}>{message}</div>
  )
}
