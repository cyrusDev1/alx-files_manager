import express from 'express';
import { env } from 'process';
import router from './routes';
const app = express();
app.use(router);
app.use(express.json());
const port = env.PORT ? env.PORT : '5002';
app.listen(port, 'localhost', () => {
  console.log(`Server running on port ${port}`);
});
