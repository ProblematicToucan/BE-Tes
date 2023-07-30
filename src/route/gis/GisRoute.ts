import { Router } from 'express';
import authenticateToken from '../../middleware/Authorization';
import GisController from '../../controller/gis/GisController'

// end point /gis
const gisRouter = Router();

gisRouter.get('/tol', authenticateToken, GisController.getRuasTol);
gisRouter.get('/tol/:id', authenticateToken, GisController.getRuasTolById);
gisRouter.post('/tol', authenticateToken, GisController.createRuasTol);
gisRouter.put('/tol/:id', authenticateToken, GisController.updateRuasTol);
gisRouter.delete('/tol/:id', authenticateToken, GisController.deleteRuasTol);

export default gisRouter;