import dBConfig from './utils/dbConfig';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './app/routes';
import  bodyParser from 'body-parser';
import express from 'express';
import jsend from 'jsend';
import swaggerUi  from 'swagger-ui-express';
import YAML from 'yamljs';
import cron from 'node-cron';
import https from 'https';
const swaggerDocument = YAML.load('./swagger.yaml')


mongoose
  .connect(
    dBConfig.database,
    { useNewUrlParser: true}
  )
  .then(() => {
    console.log('successfully connected to the database');
  })
  .catch(() => {
    console.log('unable to connect to the database  Exiting now..');
    process.exit();
  });
  mongoose.set('useCreateIndex', true);

const app = express();
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(bodyParser.json());
app.use(jsend.middleware);

app.use('/pop-mgt/api', routes)

let healthchecks = cron.schedule("*/2 * * * *", function() {
  console.log("---------------------");
  console.log("Running Cron Job For Healthchecks ");
  https.get("https://hc-ping.com/7384a6ff-a5d0-4473-93cf-efbfc009bb2c");
  console.log("---------------------");
});
healthchecks.start();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const port = process.env.PORT || dBConfig.port || 3005;

const server = app.listen(port, function() {
  console.log('app running on', server.address().port);
});

module.exports = server