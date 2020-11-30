import 'reflect-metadata';
import express from 'express';
import routes from './routes/index';
import uploadConfig from './config/uploads';
import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.listen(3333, () => {
  console.log('Server is runing');
});
