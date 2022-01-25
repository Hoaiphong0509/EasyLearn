import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiMenu-root': {
      width: '700px',
      backgroundColor: 'red'
    }
  }
}))

export default useStyles
