import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { ROLES } from 'constants/AppConstants'

const CardStudent = (props) => {
  const { users } = props
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              HỌC VIÊN
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {users.filter(u => u.roles.includes(ROLES.STUDENT)).length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            >
              <PeopleAltIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Đã đăng ký vào Easy Learn
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardStudent
