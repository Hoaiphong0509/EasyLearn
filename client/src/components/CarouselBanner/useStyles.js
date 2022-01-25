import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiButton-root': {
      marginBottom: '5px',
      width: '150px',
      border: '1px solid var(--white-1)'
    },
    '& .MuiButton-root:hover': {
      background: 'var(--smooth-blue)',
    }
  }
}))

export default useStyles
