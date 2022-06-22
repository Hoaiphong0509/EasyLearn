import React from 'react'
import Spinner from 'react-spinkit'
import s from './styles.module.scss'

const MyLoading = () => {
  return (
    <div className={s.bounce}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default MyLoading
