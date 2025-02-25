import React from 'react'
import style from '../Title/Title.module.scss'

export const Title = ({title}) => {
  return (
   <>
   <p className={style.title}><strong>{title}</strong></p>
   </>
  )
}
