import express from 'express'
import { codeExecute } from '../controllers/codeController.js'

const router = express.Router()

router.post('/execute',codeExecute)

export default router