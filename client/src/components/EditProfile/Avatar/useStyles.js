import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiButton-root': {
      background: 'var(--smooth-blue)',
      color: 'var(--black-0)'
    },
    '& .MuiButton-root:hover': {
      background: 'var(--smooth-blue)',
      color: 'var(--black-0)'
    }
  }
}))

export default useStyles
