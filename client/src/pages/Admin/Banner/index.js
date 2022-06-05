import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBanners, cleanUpBanner } from 'services/redux/actions/banner'
import { useSelector } from 'react-redux'

import Banners from 'components/Admin/ListBanners'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

const Banner = ({
  banner: { banners, loading },
  cleanUpBanner,
  getBanners
}) => {
  const bn = useSelector((state) => state.banner)

  useEffect(() => {
    getBanners()
  }, [bn.banner, getBanners])

  return (
    <Box sx={{ padding: '40px' }}>
      <Box sx={{ margin: '20px 0 ' }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            BANNERS
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Link to="/admin/banner/create_banner">
            <Button variant="contained" endIcon={<AddIcon />}>
              TẠO BANNER
            </Button>
          </Link>
        </Box>
      </Box>
      {loading || banners === null ? (
        <Spinner name="cube-grid" color="aqua" />
      ) : (
        <Banners banners={banners} />
      )}
    </Box>
  )
}

Banner.prototype = {
  getBanners: PropTypes.func.isRequired,
  cleanUpBanner: PropTypes.func.isRequired,
  banner: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  banner: state.banner
})

export default connect(mapStateToProps, { cleanUpBanner, getBanners })(Banner)
