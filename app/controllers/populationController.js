import Population from '../models/populationModel';
import Controller from './index';

export default class PopulationController extends Controller {
    async addLocationPopulation({body}, res) {
        await super.validate(body, {
            location: 'required|String'
        });

       const { location, males, females } = body;

       const newLocation = await Population.create({
           location,
           males,
           females
       })
       return res.status(200).jsend.success({ location: newLocation })

    }
    async showLocationPopulation(req, res) {

        const populationData = await Population.find({}); 
        if(!populationData){
            return res.status(400).jsend.fail({
                message: 'Oops! looks like we have no data here :('
            })
        }

        const { males, females, location } = populationData

        return res.status(200).jsend.success({ location : {
            males,
            females, 
            totalPopulation: `${males+females}`
        } })
    }
    async updateLocationPopulation(req, res) {
        const { params } = req;

        const getLocation= await Population.findById({
            _id: params, 
        });
        if(!getLocation){
            return res.status(400).jsend.fail({
                message: 'Oops! looks like your location does not exist:('
            })
        }

        // do something here

    }
    async deleteLocation(req, res) {
        const getLocation= await Population.findById({
            _id: params, 
        });

        if(!getLocation){
            return res.status(400).jsend.fail({
                message: 'Oops! looks like your location does not exist:('
            })
        }

        const removedLocation= await Population.findOneAndRemove({
            _id: params, 
        });

        return res.status(200).jsend.success({ 
            message: 'Successsfully deleted location',
            location: removedLocation 
        })
    }

}