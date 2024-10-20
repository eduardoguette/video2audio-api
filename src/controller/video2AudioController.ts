import { Request, Response } from 'express'
import ffmpeg from 'fluent-ffmpeg'
import multer from 'multer'
import stream from 'stream'

// Configurar multer para manejar la subida de archivos en memoria
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const video2AudioController = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).send('No se ha subido ningún archivo de video')
  }

  const videoBuffer = req.file.buffer

  res.setHeader('Content-Type', 'audio/wav')
  res.setHeader('Content-Disposition', 'attachment; filename="output.wav"')

  const passThrough = new stream.PassThrough()

  ffmpeg()
    .input(new stream.PassThrough().end(videoBuffer))
    .audioCodec('libmp3lame')
    .format('wav')
    .on('error', (err) => {
      console.error('Error durante la conversión:', err)
      res.status(500).send('Error durante la conversión del video a audio')
    })
    .pipe(passThrough)
    .pipe(res)
}

export { upload, video2AudioController }
