import { v4 as uuid } from 'uuid'
import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material'
import { Link } from 'react-router-dom'
import GitHub from 'assets/img/admin/github.png'
import MongoDB from 'assets/img/admin/mongo.png'
import Cloud from 'assets/img/admin/cloud.png'
import OurProduct from 'assets/img/admin/product.png'

const products = [
  {
    id: uuid(),
    name: 'Github Easy Learn',
    imageUrl: GitHub,
    desc: 'Source code của EasyLearn',
    url: 'https://github.com/Hoaiphong0509/EasyLearn'
  },
  {
    id: uuid(),
    name: 'Database',
    imageUrl: MongoDB,
    desc: 'Cơ sở dữ liệu',
    url: 'https://cloud.mongodb.com/'
  },
  {
    id: uuid(),
    name: 'Tiện tích đám mây lưu trữ',
    imageUrl: Cloud,
    desc: 'Lưu resource của EasyLearn',
    url: 'https://cloudinary.com/'
  },
  {
    id: uuid(),
    name: 'Trang web EasyLearn',
    imageUrl: OurProduct,
    desc: 'Trang web học tập EasyLearn',
    url: '/'
  }
]

const Products = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="SẢN PHẨM & TÀI NGUYÊN"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <a target='_blank' href={product.url} key={i}>
          <ListItem
            divider={i < products.length - 1}
            style={{ cursor: 'pointer' }}
          >
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.imageUrl}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`${product.desc}`}
            />
          </ListItem>
        </a>
      ))}
    </List>
  </Card>
)

export default Products
