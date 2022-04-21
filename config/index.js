require('dotenv').config()

module.exports = {
  DB: process.env.APP_DB,
  DB_LOCALE: process.env.APP_DB_LOCALE,
  SECRET: process.env.APP_SECRET,
  PORT: process.env.APP_PORT,
  API_EMAIL: process.env.API_KEY_EMAIL_VERIFY,
  TOKEN_EXPRIRES: process.env.TOKEN_EXPRIRES,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_PATH_AVATAR: process.env.CLOUDINARY_PATH_AVATAR,
  CLOUDINARY_PATH_BLOG: process.env.CLOUDINARY_PATH_BLOG,
  CLOUDINARY_PATH_COURSE_IMG: process.env.CLOUDINARY_PATH_COURSE_IMG,
  CLOUDINARY_PATH_COURSE_VIDEO: process.env.CLOUDINARY_PATH_COURSE_VIDEO,
  COURSE_IMG_DEFAULT: process.env.COURSE_IMG_DEFAULT,
  CLIENT_URL: process.env.CLIENT_URL,
  BLOG_IMG_DEFAULT: process.env.BLOG_IMG_DEFAULT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_ACCESS_TOKEN: process.env.GOOGLE_CLIENT_ID,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
}
