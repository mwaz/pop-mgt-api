import Population from '../models/populationModel';
import Controller from './index';

export default class PopulationController extends Controller {
    async addLocationPopulation({body}, res) {
        await super.validate(body, {
            location: 'required|string'
        });

        if(body.parentLocation !== undefined){
            const existingParent = await Population.findOne({
                location: body.parentLocation
            });
            if(!existingParent){
                return res.status(400).jsend.fail({
                    message: 'Oops! looks like we do not have that parent location yet :('
                })
            }
            body.parentLocation = existingParent.location
        }
        const { location, males, females, parentLocation } = body;
        
        const newLocation = await Population.create({
           location,
           males,
           females,
           parentLocation
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
        const populationObjectArray = populationData.map(population => {
            if (populationData.length > 0){
                const { location, males, females, parentLocation, _id } = population
                return {
                    _id,
                    location,
                    males,
                    females,
                    totalPopulation: males + females,
                    parentLocation
                };
            }
        })
        res.status(200).jsend.success({ populationData: populationObjectArray })
    }

    async showSingleLocationPopulation(req, res) {
        const { params } = req;

        const populationData = await Population.findById({
            _id: params.locationId
        }); 

        if(!populationData){
            return res.status(400).jsend.fail({
                message: 'Oops! looks like we have no data here for that location :('
            })
        }
        const {males, females, location, _id} = populationData;

        res.status(200).jsend.success({ 
            location,
            males,
            females,
            totalPopulation: males+females,
            _id,
         })
    }

    async updateLocationPopulation(req, res) {
        const { params, body } = req;
        await super.validate(body, {
            location: 'required|string'
        })

        const getLocation = await Population.findById({
            _id: params.locationId, 
        });

        if(!getLocation){
            return res.status(400).jsend.fail({
                message: 'Oops! looks like we have no data here for that location :('
            })
        };
        console.log(body.location, '[][][][][[]][][][][][][][][][][][][][][][][][][] your output');
        

        const updateReferences = await Population.bulkWrite([
            {
                updateOne: {
                    filter: { parentLocation: getLocation.location },
                    update: { parentLocation: body.location }
                },
            },
            {
                updateOne: {
                    filter: { location: getLocation.location },
                    update: { location : body.location }
                }
            }
        ]);
        if(getLocation){
            await updateReferences
            console.log( updateReferences.modifiedCount, 'stuff[][][][][[]][][][][][][][][][][][][][][][][][][] your output');
            return res.status(200).jsend.success({
                updatedLocations: updateReferences.modifiedCount,
                changedDetails: {
                    location: body.location,
                    males: body.males,
                    females: body.females
                }
             })
            }

            
        // }   

    }
    async deleteLocation(req, res) {
        const { params } = req;

        const getLocation= await Population.findById({
            _id: params.locationId, 
        });

        if(!getLocation){
            return res.status(400).jsend.fail({
                message: 'Oops! looks like your location does not exist:('
            })
        }

        const removedLocation= await Population.findOneAndRemove({
            location: getLocation.location, 
        });

        return res.status(200).jsend.success({ 
            message: 'Successsfully deleted location',
            location: removedLocation 
        })
    }

}