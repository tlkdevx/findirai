import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/user';
import authRoutes from './routes/user'; // This should be separate when auth routes are defined separately

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // This should be separate when auth routes are defined separately

app.get('/', (req, res) => {
  res.send('Hello, Financial Platform!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});