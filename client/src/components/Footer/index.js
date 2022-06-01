import React from 'react'
import { Link } from 'react-router-dom'

import { Facebook, GitHub } from '@mui/icons-material'

import s from './styles.module.scss'

const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className={s.root}>
      <div className={s.box}>
        <div className={s.logo}>
          <img src="/logoSymbol.png" alt="logo" />
          <h3>EasyLearn - Học để hiểu biết</h3>
        </div>
        <span>Điện thoại: 0865932614</span>
        <span>Email: hoaiphong0050@gmail.com</span>
        <span>Địa chỉ: Việt Nam, TP Hồ Chí Minh</span>
      </div>
      <div className={s.box}>
        <h3>Về EasyLearn</h3>
        <Link onClick={goToTop} className={s.link} to="/about">
          Giới thiệu
        </Link>
        <Link onClick={goToTop} className={s.link} to="/policy">
          Điều khoản
        </Link>
      </div>
      <div className={s.box}>
        <h3>Hổ trợ</h3>
        <Link onClick={goToTop} className={s.link} to="/feedback">
          Đóng góp/Report
        </Link>
        <Link onClick={goToTop} className={s.link} to="/privacy">
          Bảo mật
        </Link>
      </div>
      <div className={s.social}>
        <h3>Liên kết xã hội</h3>
        <a className={s.social} href="https://www.facebook.com/hp0509/">
          <Facebook />
        </a>
        <a className={s.social} href="https://github.com/Hoaiphong0509">
          <GitHub />
        </a>
      </div>
    </footer>
  )
}

export default Footer
