import { Router } from 'express';
import catchErrors from 'async-error-catcher'
import PopulationController from '../controllers/populationController';

const populationController = new PopulationController();
const router = new Router();

router.post('/', catchErrors(populationController.addLocationPopulation));
router.get('/', catchErrors(populationController.showLocationPopulation));
router.put('/:locationId', catchErrors(populationController.updateLocationPopulation));
router.delete('/:locationId', catchErrors(populationController.deleteLocation));


router.use((error, req, res, next) => {
if (error.type === 'ValidationError') {
    return res.status(422).jsend.fail({ errors: error.errors})
  };

  if (error.errors.location) {
    return res.status(409).jsend.fail({
      message: error.errors.location.message,
      field: 'location'
    })
  };
  
  res.status(500).jsend.error({
    message: 'Something went wrong on the server.'
  });
});

export default router;