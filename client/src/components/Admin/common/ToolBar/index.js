import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material'
import { Search as SearchIcon } from 'assets/icons/search'

const ToolBar = (props) => {
  const { title, placeholder, getKeyWord } = props
  const [keyWord, setKeyWord] = useState('')

  const handleChange = (e) => {
    setKeyWord(e.target.value)
    getKeyWord(keyWord)
  }
  return (
    <Box {...props}>
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
          {title}
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ maxWidth: 500 }}>
          <TextField
            fullWidth
            onChange={handleChange}
            name="keyword"
            value={keyWord}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            placeholder={placeholder}
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
  )
}

ToolBar.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  getKeyWord: PropTypes.func,
}

export default ToolBar
