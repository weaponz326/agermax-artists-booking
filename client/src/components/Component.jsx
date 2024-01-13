/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from 'react'
import { IconsansLinearSearch1 } from '../../icons/IconsansLinearSearch1'
import './style.css'

export const Component = ({ className }) => {
  return (
    <div className={`component ${className}`}>
      <div className='text-wrapper'>Find amazing artists...</div>
      <IconsansLinearSearch1 className='iconsans-linear' />
    </div>
  )
}
