import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const orders = [
  {
    id: uuid(),
    ref: '#EasyLearn v.0.0.',
    amount: 30.5,
    content: {
      name: 'Chỉnh sửa lỗi Comment ỏ khoá học'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: '#EasyLearn v.0.0.',
    content: {
      name: 'Liked và Unlike Blogs'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: '#EasyLearn v.0.0.',

    content: {
      name: 'Chỉnh sửa lỗi thêm, chỉnh sửa khoá học'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: '#EasyLearn v.0.0.',

    content: {
      name: 'Thêm admin panel'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: '#EasyLearn v.0.0.',

    content: {
      name: 'Test EasyLearn Learning'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: '#EasyLearn v.0.0.',

    content: {
      name: 'Coding...'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
]

const ReportUpdate = (props) => (
  <Card {...props}>
    <CardHeader title="Report Update" />

    <Box sx={{ minWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Update</TableCell>
            <TableCell sortDirection="desc">
              <Tooltip enterDelay={300} title="Sort">
                <TableSortLabel direction="desc">Date</TableSortLabel>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow hover key={order.id}>
              <TableCell>{order.ref}{index}</TableCell>
              <TableCell>{order.content.name}</TableCell>
              <TableCell>{format(order.createdAt, 'dd/MM/yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
)

export default ReportUpdate
