const cloudinary = require('cloudinary').v2
const { error } = require('consola')
const { Readable } = require('stream')

const bufferUpload = async (buffer, path) => {
  return new Promise(async (resolve, reject) => {
    const writeStream = cloudinary.uploader.upload_chunked_stream(
      {
        folder: path,
        tags: 'avatar',
        width: 800,
        height: 800,
        crop: 'fit',
      },
      (err, result) => {
        if (err) {
          error({ msg: `Error in bufferUpload: ${err.message}`, badge: true })
          reject(err)
          return
        }
        resolve(result)
      }
    )

    const readStream = new Readable({
      read() {
        this.push(buffer)
        this.push(null)
      },
    })
    readStream.pipe(writeStream)
  })
}

module.exports = bufferUpload
