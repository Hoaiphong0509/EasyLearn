import { makeStyles } from '@mui/styles'
import { hover } from '@testing-library/user-event/dist/hover'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiSvgIcon-root': {
      fontSize: '20px'
    },
    '& .MuiListItemIcon-root': {
      // textAlign: 'center',
    }, 
    '& .MuiListItemButton-root' : {
      marginBottom: '5px',
      marginLeft: '-31px',
    },
    '& .MuiListItemButton-root:hover' : {
      background: 'none',
    }
  }
}))

export default useStyles
