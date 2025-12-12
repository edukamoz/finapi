import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { statementsRoutes } from './statements.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use('/users', userRoutes)
router.use(authenticateRoutes)
router.use('/statements', statementsRoutes)

export { router }
