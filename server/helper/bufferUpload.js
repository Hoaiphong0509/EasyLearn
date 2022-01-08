const cloudinary = require('cloudinary').v2
const { error } = require('consola')
const { Readable } = require('stream')

const bufferUpload = async (buffer, path, tags, width, height) => {
  return new Promise(async (resolve, reject) => {
    const writeStream = cloudinary.uploader.upload_chunked_stream(
      {
        folder: path,
        tags,
        width,
        height,
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
