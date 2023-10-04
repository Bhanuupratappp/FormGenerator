import React from 'react'

export const DropdownInput = ({id,name,className,value,choices}) => {
  return <select id={id} name={name} className={className} >
        <option value={value}>Select an Option</option>
        {choices}
  </select>
    
  
}
