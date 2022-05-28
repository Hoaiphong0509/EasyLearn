import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import { ROLES } from 'constants/AppConstants'

const CardCreator = (props) => {
  const { users } = props
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              CỘNG TÁC VIÊN
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {users.filter((u) => u.roles.includes(ROLES.CREATOR)).length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56
              }}
            >
              <SchoolIcon />
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
            Đã trở thành cộng tác viên
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardCreator
