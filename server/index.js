import dotenv from 'dotenv';
import { App } from './app.js';
import { DriverController } from './controllers/driver-controller.js';
import { RestaurantController } from './controllers/restaurant-controller.js';
import { TrackingController } from './controllers/tracking.controllers.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = new App([new DriverController(), new RestaurantController(), new TrackingController()], PORT);

app.listen();