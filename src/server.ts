import 'reflect-metadata';
import express, { NextFunction } from 'express';
import routes from './routes/index';
import uploadConfig from './config/uploads';
import AppError from './errors/AppError';
import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(err);

    return response.status(500).json({
      status: 'error',
      messaeg: 'Internal server error',
    });
  }
);
app.listen(3333, () => {
  console.log('Server is runing');
});
