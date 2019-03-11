import mongoose, { model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const populationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        unique: true
    },

    males: {
        type: Number,
        required: false
    }, 
    females: {
        type: Number,
        required: false
    },
},
{
  timestamps: true
}
)

populationSchema.plugin(
    uniqueValidator, {
        message: 'This {PATH} has already been added.'
    });


const Population = mongoose.model('Population', populationSchema);

export default Population;
