import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);
