import { Box, Typography } from '@mui/material'
import React from 'react'
import s from './styles.module.scss'
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'

const BannerItem = (props) => {
  const { banner } = props
  const { titleVi, titleEn, descVi, descEn, link, color1, color2, img } = banner

  const { t } = useTranslation()

  const currentLanguageCode =
    (cookies.get('i18next') && cookies.get('i18next')) || 'vi'

  return (
    <Box
      className={s.root}
      style={{
        backgroundImage: `linear-gradient(62deg, ${color1} 0%, ${color2} 100%)`
      }}
    >
      <div className={s.content}>
        <Typography
          variant="h2"
          component="h2"
          fontWeight="bold"
          color="var(--white-1)"
        >
          {currentLanguageCode === 'vi' ? titleVi : titleEn}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="20px"
          color="var(--white-2)"
        >
          {currentLanguageCode === 'vi' ? descVi : descEn}
        </Typography>
        <a
          rel="noreferrer"
          target="_blank"
          href={link}
          className={s.btn}
          style={{ background: `darken(${color1}, 1.5%)` }}
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          {t('view')}
        </a>
      </div>
      <div className={s.image}>
        <img src={img} alt={titleVi} />
      </div>
    </Box>
  )
}

export default BannerItem
