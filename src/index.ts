import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan'

import { 
  home as homeRoutes, 
  users as usersRoutes,
  manga as mangaRoutes
} from './routes'
import { config } from './config';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', homeRoutes);
app.use('/users', usersRoutes);
app.use('/manga', mangaRoutes);


app.listen(config.PORT, () => {
  console.info(
    `(${config.NODE_ENV}) running on port ${config.PORT}`,
    );
  });
  
module.exports = app;