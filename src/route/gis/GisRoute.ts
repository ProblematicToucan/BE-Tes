import { Router } from 'express';
import authenticateToken from '../../middleware/Authorization';
import GisController from '../../controller/gis/GisController'

// end point /gis
const gisRouter = Router();

gisRouter.get('/ruas', authenticateToken, GisController.getRuasTol);
gisRouter.get('/ruas/:id', authenticateToken, GisController.getRuasTolById);
gisRouter.post('/ruas', authenticateToken, GisController.createRuasTol);
gisRouter.put('/ruas/:id', authenticateToken, GisController.updateRuasTol);
gisRouter.delete('/ruas/:id', authenticateToken, GisController.deleteRuasTol);

export default gisRouter;