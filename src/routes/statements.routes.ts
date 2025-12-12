import { Router } from 'express'
import { CreateStatementController } from '../modules/accounts/useCases/createStatement/CreateStatementController'
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticated'

const statementsRoutes = Router()
const createStatementController = new CreateStatementController()

statementsRoutes.use(ensureAuthenticated)

statementsRoutes.post('/deposit', createStatementController.handle)

statementsRoutes.post('/withdraw', createStatementController.handle)

export { statementsRoutes }
