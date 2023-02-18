import * as mongoose from 'mongoose';
import { databaseConfig } from '../config/database.config';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await mongoose.connect(databaseConfig.uri),
  },
];
