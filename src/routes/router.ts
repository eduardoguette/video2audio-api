import { Router } from 'express'
import {
  upload,
  video2AudioController
} from '../controller/video2AudioController'

const mainRouter = Router()

mainRouter.post('/upload', upload.single('video'), video2AudioController)

export default mainRouter
