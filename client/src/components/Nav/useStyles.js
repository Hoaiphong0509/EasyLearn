import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    position: 'sticky',
    top: 100,

    '& .MuiSvgIcon-root': {
      fontSize: '20px'
    },
    '& .MuiListItemButton-root': {
      marginBottom: '5px',
      marginLeft: '-31px'
    },
    '& .MuiListItemButton-root:hover': {
      background: 'none'
    }
  }
}))

export default useStyles
