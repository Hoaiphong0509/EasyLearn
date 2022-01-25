import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: ' 0 !important'
    }
  }
}))

export default useStyles
