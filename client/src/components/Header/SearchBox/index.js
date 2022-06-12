import {
  Avatar,
  Box,
  Divider,
  Hidden,
  Input,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { isRequired } from 'utils/AppUltils'

import s from './styles.module.scss'
import useStyles from './useStyles'
import cn from 'classnames'

import PropTypes from 'prop-types'
import { search } from 'services/redux/actions/user'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const SearchBox = ({ search, searchResult }) => {
  const [resultSearch, setResultSearch] = useState()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [keyword, setKeyword] = useState('')
  const { t } = useTranslation()
  const c = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isRequired(keyword)) {
      search({ keyword })
      console.log(searchResult)

      setAnchorEl(e.currentTarget)

      setResultSearch(searchResult)
    }
    setKeyword('')
  }

  return (
    <React.Fragment>
      <Box className={cn(s.root, c.root)}>
        <form className={s.form} onSubmit={handleSubmit}>
          <TextField
            name="keyword"
            className={s.textField}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={t('header.search')}
          />
          <Hidden mdUp>
            <Input hidden onSubmit={handleSubmit} type="submit" />
          </Hidden>
        </form>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          sx={{ marginTop: '15px' }}
        >
          {searchResult && searchResult.courses.length > 0 ? (
            <Box className={s.boxList} sx={{ padding: '10px', width: '650px' }}>
              <Typography
                sx={{
                  color: 'var(--dark-blue)',
                  fontWeight: 'bold',
                  marginRight: '10px'
                }}
                variant="h4"
              >
                {t('courses')}
              </Typography>
              <MenuList>
                {searchResult &&
                  searchResult.courses.length > 0 &&
                  searchResult.courses.map((course) => (
                    <Box key={course._id}>
                      <Link to={`/courses/course_detail/${course._id}`}>
                        <MenuItem sx={{ marginBottom: '20px' }}>
                          <Avatar
                            src={course.img}
                            sx={{
                              width: 64,
                              height: 64,
                              marginRight: '10px'
                            }}
                          />
                          <Typography
                            sx={{
                              color: 'var(--dark-blue)',
                              fontWeight: 'bold'
                            }}
                            variant="h5"
                          >
                            {course.title}
                          </Typography>
                        </MenuItem>
                      </Link>
                    </Box>
                  ))}
              </MenuList>
              <Divider />
              <Typography
                sx={{
                  color: 'var(--dark-blue)',
                  fontWeight: 'bold',
                  marginRight: '10px'
                }}
                variant="h4"
              >
                {t('blogs')}
              </Typography>
              <MenuList>
                {resultSearch &&
                  resultSearch.blogs.length > 0 &&
                  resultSearch.blogs.map((blog) => (
                    <Box key={blog._id}>
                      <Link to={`/blogs/blog_detail/${blog._id}`}>
                        <MenuItem sx={{ marginBottom: '20px' }}>
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              marginRight: '10px'
                            }}
                            src={blog.author.avatar}
                          />
                          <Typography
                            sx={{
                              color: 'var(--dark-blue)',
                              fontWeight: 'bold'
                            }}
                            variant="h5"
                          >
                            {blog.title}
                          </Typography>
                        </MenuItem>
                      </Link>
                    </Box>
                  ))}
              </MenuList>
            </Box>
          ) : (
            <Box className={s.boxList} sx={{ padding: '10px', width: '650px' }}>
              <Typography>Không tìm thấy thông tin</Typography>
            </Box>
          )}
        </Menu>
      </Box>
    </React.Fragment>
  )
}

SearchBox.prototype = {
  search: PropTypes.func.isRequired,
  searchResult: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  searchResult: state.user.searchResult
})

export default connect(mapStateToProps, { search })(SearchBox)
