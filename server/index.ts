import express from 'express';
import path from 'path';
import router from './routes/index';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(express.static(path.resolve(__dirname, '../server', 'build')));

app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, '../server', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
