import 'reflect-metadata';
import express, { NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/uploads';
import AppError from '@shared/errors/AppError';
import routes from './routes/index';
import '@shared/infra/typeorm';
import '@shared/container/index';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);
app.listen(3333, () => {
  console.log('Server is runing');
});
