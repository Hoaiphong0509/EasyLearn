import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import HomeIcon from '@mui/icons-material/Home'

import { useTranslation } from 'react-i18next'

const NotFoundPage = (props) => {
  const { t } = useTranslation()
  const { title = t('notFound.title'), content = t('notFound.desc') } = props

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography align="center" color="textPrimary" variant="h1">
              {title}
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              {content}
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <img
                alt="Under development"
                src="/assets/img/undraw_page_not_found_su7k.svg"
                style={{
                  marginTop: 50,
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 560
                }}
              />
            </Box>
            <Link to="/">
              <Button sx={{ mt: 3 }} variant="contained">
                <HomeIcon />
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  )
}

NotFoundPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
}

export default NotFoundPage
