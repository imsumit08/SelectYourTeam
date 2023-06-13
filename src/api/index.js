// /////////////////////////////////////////////////////////////////////////////
// PLEASE DO NOT MODIFY, RENAME OR REMOVE ANY OF THE CODE BELOW. 
// ALSO DO NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// YOU CAN ADD YOUR OWN CODE TO THIS FILE AND USE THEM IN YOUR WORK.
// /////////////////////////////////////////////////////////////////////////////
import _ from './_'; 
import express from 'express';
const bodyParser = require('body-parser');


const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

const routes = express.Router();

require('./player').default(routes);
require('./team').default(routes);

app.use('/api', routes);
export default app;