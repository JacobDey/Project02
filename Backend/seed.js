import mongoose from 'mongoose';
//import dotenv from 'dotenv';
import { MenuItem } from './models/menu-item.js'; // Adjust the import path as needed

dotenv.config();

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://Lopocozo:sX1eFqfdDhEtUqSj@cluster0.yhnnp.mongodb.net/";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const seedMenuItems = async () => {
  const items = [
    {
      name: 'Pizza Margherita',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil.',
      price: 10.99,
    },
    {
      name: 'Spaghetti Carbonara',
      description: 'Pasta with eggs, cheese, pancetta, and pepper.',
      price: 12.99,
    },
    {
      name: 'Caesar Salad',
      description: 'Romaine lettuce, croutons, and Caesar dressing.',
      price: 8.99,
    },
    {
      name: 'Tiramisu',
      description: 'Coffee-flavored Italian dessert.',
      price: 6.99,
    },
  ];

  try {
    await MenuItem.deleteMany(); // Clear existing data
    await MenuItem.insertMany(items);
    console.log('Menu items seeded successfully');
  } catch (err) {
    console.error('Error seeding menu items:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedMenuItems();