import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import itemRoutes from './routes/item.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'static')));

// Use routes
app.use('/api', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
