import {Router} from 'express'
import * as handlers from "../../handler/order.handler"
import auth_m_ware from '../../middleware/users.auth.middleware'

const routes= Router()
var bodyParser = require('body-parser')
routes.use( bodyParser.json() );       // to support JSON-encoded bodies
routes.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

routes.route('/create')
.post(handlers.create)

routes.route('/create/multiple')
.post(handlers.createMultiple)


routes.route('/')
.get(handlers.RetrieveAll)
routes.route('/inactive')
.get(handlers.RetrieveAllInactive)

routes
.route('/history/:id')
.get(handlers.RetrieveUserHistory)

routes
.route('/status/:id')
.patch(handlers.updateStatus)


routes
.route('/:id')
.get(handlers.RetrieveSingle)
.patch(handlers.updateSingle)
.delete(handlers.deleteSingle)


export default routes