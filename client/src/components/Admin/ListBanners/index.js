import React from 'react'
import BannerItem from 'components/CarouselBanner/BannerItem'
import { Box, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleActiveBanner, deleteBanner } from 'services/redux/actions/banner'

const ListBanners = ({ banners, toggleActiveBanner, deleteBanner }) => {
  return (
    banners &&
    banners.map((bn, idx) => (
      <Box sx={{ marginBottom: '40px' }} key={idx}>
        <BannerItem banner={bn} />
        <Box
          sx={{ marginTop: '10px', display: 'flex', alignContent: 'center' }}
        >
          {bn.isActive ? (
            <Button
              variant="contained"
              color="warning"
              sx={{ marginRight: '10px' }}
              onClick={() => toggleActiveBanner(bn._id)}
            >
              Huỷ hiển thị
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              sx={{ marginRight: '10px' }}
              onClick={() => toggleActiveBanner(bn._id)}
            >
              Kích hoạt
            </Button>
          )}

          <Button
            variant="contained"
            color="error"
            sx={{ marginRight: '10px' }}
            onClick={() => deleteBanner(bn._id)}
          >
            Xoá
          </Button>
          <CheckCircleIcon
            color={`${bn.isActive ? 'success' : 'disabled'}`}
            fontSize="large"
          />
        </Box>
      </Box>
    ))
  )
}

ListBanners.prototype = {
  toggleActiveBanner: PropTypes.func.isRequired,
  deleteBanner: PropTypes.func.isRequired
}
// const mapStateToProps = (state) => ({
//   banner: state.banner
// })

export default connect(null, {
  toggleActiveBanner,
  deleteBanner
})(ListBanners)
