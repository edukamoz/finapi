import { Router } from 'express'
import { CreateStatementController } from '../modules/accounts/useCases/createStatement/CreateStatementController'
import { GetBalanceController } from '../modules/accounts/useCases/getBalance/GetBalanceController'
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticated'

const statementsRoutes = Router()
const createStatementController = new CreateStatementController()
const getBalanceController = new GetBalanceController()

statementsRoutes.use(ensureAuthenticated)

statementsRoutes.get('/balance', getBalanceController.handle)
statementsRoutes.post('/deposit', createStatementController.handle)
statementsRoutes.post('/withdraw', createStatementController.handle)

export { statementsRoutes }
