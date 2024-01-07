import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
export default function Icon({ className,icon,color ='' }) {
  return (
    <FontAwesomeIcon  className={className} icon={Icons["fa" + icon]}  style={{color: color}} />
  )
}
