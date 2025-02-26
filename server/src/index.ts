import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import bankRoutes from './routes/bank';
import uploadRoutes from './routes/upload';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello, Financial Platform!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});