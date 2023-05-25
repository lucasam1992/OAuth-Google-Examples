import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './route/authRouter';

const app = express();

app.set('port', process.env.PORT || 3000);

// midlewares
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());    

app.use('/api/auth', authRoutes);

export default app;