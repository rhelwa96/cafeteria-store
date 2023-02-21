import {Router} from 'express'
import * as handlers from "../../handler/user.handler"
import auth_m_ware from '../../middleware/users.auth.middleware'
import admin_m_ware from '../../middleware/admin.auth.middleware'
const routes= Router()
var bodyParser = require('body-parser')
routes.use( bodyParser.json() );       // to support JSON-encoded bodies
routes.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

routes.route('/')
.get(auth_m_ware,handlers.RetrieveAll)
.post(handlers.create)

routes.route('/balance/:id')
.get(auth_m_ware,handlers.balance)

routes.route('/balance/:datefrom/:dateto')
.get(auth_m_ware,handlers.RetrieveMultipleBalance)

routes
.route('/:id')
.get(handlers.RetrieveSingle)
.delete(handlers.deleteSingle)

routes
.route('/authenticate')
.post(handlers.authenticate)


routes
.route('/forget-password')
.post(handlers.forgetPassword)

routes
.route('/reset-password')
.patch(handlers.updateSingle)


export default routes