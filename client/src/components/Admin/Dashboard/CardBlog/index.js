import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Create from '@mui/icons-material/Create'

const CardBlog = (props) => {
  const { blogs } = props
  console.log("BLOGS", blogs);
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              BLOGS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {blogs.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <Create />
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

export default CardBlog
