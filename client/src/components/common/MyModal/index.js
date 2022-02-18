import React, { useState } from 'react'
import s from './styles.module.scss'

const MyModal = ({ title, message, setOpenModal }) => {
  return (
    <div className={s.modalBackground}>
      <div className={s.modalContainer}>
        <div className={s.titleCloseBtn}>
          <button
            onClick={() => {
              setOpenModal(false)
            }}
          >
            X
          </button>
        </div>
        <div className={s.title}>
          <h1>{title}</h1>
        </div>
        <div className={s.body}>
          <p>{message}</p>
        </div>
        <div className={s.footer}>
          <button
            onClick={() => {
              setOpenModal(false)
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default MyModal
