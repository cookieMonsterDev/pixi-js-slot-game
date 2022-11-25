import express from 'express';
import cors from 'cors';
import { spinRoute } from './routes/spinRoute';
import errorHandler from './errorHandler/errorsMiddleware';

const port = 3000;
const app = express();

app.use(cors());

app.use(express.json());

app.use(spinRoute);

app.listen(port);

app.use(errorHandler);
