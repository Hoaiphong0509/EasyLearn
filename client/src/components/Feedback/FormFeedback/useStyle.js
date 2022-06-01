import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  form: {
    '& .MuiInputBase-root': {
      marginBottom: '15px',
      width: '100%',
      border: '1px solid var(--white-1)'
    },
  }
}))

export default useStyles
