import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Class from '@mui/icons-material/Class'

const CardCourse = (props) => {
  const { courses } = props
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              KHOÁ HỌC
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {courses.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56
              }}
            >
              <Class />
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
            Đã được tạo
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
export default CardCourse
