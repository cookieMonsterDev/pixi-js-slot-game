import express from 'express';
import { spinControl } from '../controls/spinControl';

const spinRoute = express.Router();

spinRoute.route('/spin').post(spinControl);

export { spinRoute };
