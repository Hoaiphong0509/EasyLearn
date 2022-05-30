import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFeedback } from 'services/redux/actions/moderator'
import Spinner from 'react-spinkit'
import FeedbackIn4 from 'components/Admin/Feedback/FeedbackIn4'

const FeedbackDetail = ({
  getFeedback,
  feedback: { feedback, loading },
  match
}) => {
  useEffect(() => {
    getFeedback(match.params.id)
  }, [getFeedback, match.params.id])
  return loading || feedback === null ? (
    <Spinner name="cube-grid" color="aqua" />
  ) : (
    <FeedbackIn4 feedback={feedback} />
  )
}

FeedbackDetail.prototype = {
  getFeedback: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = (state) => ({
  feedback: state.feedback,
  auth: state.auth
})

export default connect(mapStateToProps, { getFeedback })(FeedbackDetail)
