import { Router } from 'express';
import populationRoutes from './populationRoutes';

const router = Router();

router.use('/population', populationRoutes);

export default router;