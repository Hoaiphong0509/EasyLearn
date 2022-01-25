const cloudinary = require('cloudinary').v2
const { error } = require('consola')
const { Readable } = require('stream')

const uploadImg = async (img, path, tags, width, height) => {
  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader.upload(
      img,
      {
        folder: path,
        tags,
        width,
        height,
        crop: 'fit',
      },
      (err, result) => {
        if (err) {
          error({ msg: `Error in uploadImg: ${err.message}`, badge: true })
          reject(err)
          return
        }
        resolve(result)
      }
    )
  })
}

module.exports = uploadImg
