import ffmpeg from 'fluent-ffmpeg'
import stream from 'stream'

export const convertVideoToAudio = async (
  videoBuffer: Buffer
): Promise<stream.PassThrough> => {
  return new Promise((resolve, reject) => {
    const passThrough = new stream.PassThrough() // Stream para devolver el resultado sin almacenar

    ffmpeg()
      .input(new stream.PassThrough().end(videoBuffer)) // Convertir el buffer del video
      .audioCodec('pcm_s16le') // Códec para el formato WAV
      .format('wav') // Formato WAV
      .on('error', (err) => {
        console.error('Error durante la conversión:', err)
        reject(err) // Rechazar en caso de error
      })
      .on('end', () => {
        resolve(passThrough) // Resolver el stream cuando finalice la conversión
      })
      .pipe(passThrough) // Pipe para devolver el resultado sin almacenar
  })
}
