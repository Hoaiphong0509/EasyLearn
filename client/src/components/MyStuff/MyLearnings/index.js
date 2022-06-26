import { Grid, Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CourseItem from 'components/CourseList/CourseItem'
import { useTranslation } from 'react-i18next'
import { getMyLearnings } from 'services/redux/actions/course'

const MyLearnings = ({ learnings: courses }) => {
  const { t } = useTranslation()
  return courses.length > 0 ? (
    <Grid container spacing={4}>
      {courses &&
        courses.map((course) => (
          <Grid item md={4} key={course._id}>
            <CourseItem course={course} />
          </Grid>
        ))}
    </Grid>
  ) : (
    <Typography
      sx={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}
      variant="h2"
    >
      {t('myStuff.noLearnings')}
    </Typography>
  )
}

MyLearnings.prototype = {
  course: PropTypes.object.isRequired,
  getMyLearnings: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})

export default connect(mapStateToProps, { getMyLearnings })(MyLearnings)
