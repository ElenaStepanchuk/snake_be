import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/api/userRoutes';

dotenv.config();

const AppDataSource = new DataSource({
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  type: 'postgres',
  entities: [User],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })

  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send({
    status_code: 200,
    detail: 'HELLO NODE.JS + POSTGRESQL!',
    result: 'DB started',
  });
});

app.listen(PORT, () => console.log(`server started on port: ${PORT}.`));
app.use('/api', userRoutes);

export default AppDataSource;
