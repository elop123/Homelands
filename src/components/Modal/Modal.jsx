import React from 'react'
import style from '../Modal/Modal.module.scss'

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className={style.overlay} onClick={onClose}>
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <button className={style.closeButton} onClick={onClose}>&times;</button>
          <div className={style.modalContent}>{children}</div>
        </div>
      </div>
    )
  }
