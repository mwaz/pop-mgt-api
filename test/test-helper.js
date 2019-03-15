import mongoose from 'mongoose';
import dBConfig from '../utils/dbConfig';

//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;
mongoose.connect(dBConfig.database); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
//Called hooks which runs before something.
afterEach((done) => {
    mongoose.connection.collections.populations.drop(() => {
         //this function runs after the drop is completed
        
        done(); //go ahead everything is done now.
    }); 
});

after(async() => {
    await process.exit(0);
})