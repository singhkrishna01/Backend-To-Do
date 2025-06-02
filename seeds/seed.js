
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Todo = require('../models/Todo');
const connectDB = require('../config/database');

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Todo.deleteMany({});

    console.log('Existing data cleared...');

    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '123456'
      },
      {
        name: 'Baby Johnson',
        email: 'baby@example.com',
        password: '123456'
      },
      {
        name: 'Jany Smith',
        email: 'jany@example.com',
        password: '123456'
      },
      {
        name: 'reem Johnson',
        email: 'reema@example.com',
        password: '123456'
      }
    ]);

    console.log('Users created...');

    // Create sample todos
    const todos = [
      {
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the new project',
        priority: 'high',
        userId: users[0]._id
      },
      {
        title: 'Review code changes',
        description: 'Review pull requests from team members',
        priority: 'medium',
        userId: users[0]._id
      },
      {
        title: 'Plan team meeting',
        description: 'Schedule and prepare agenda for weekly team meeting',
        priority: 'low',
        userId: users[0]._id
      },
      {
        title: 'Update client presentation',
        description: 'Revise slides for upcoming client presentation',
        priority: 'high',
        userId: users[1]._id
      },
      {
        title: 'Database optimization',
        description: 'Optimize database queries for better performance',
        priority: 'medium',
        userId: users[1]._id
      },
      {
        title: 'Setup development environment',
        description: 'Configure local development environment for new team member',
        priority: 'medium',
        userId: users[2]._id
      },
      {
        title: 'Write unit tests',
        description: 'Create comprehensive unit tests for user authentication',
        priority: 'high',
        userId: users[2]._id
      },
      {
        title: 'Research new technologies',
        description: 'Investigate new frameworks and tools for next project',
        priority: 'low',
        userId: users[2]._id
      }
    ];

    await Todo.create(todos);

    console.log('Todos created...');
    console.log('Database seeded successfully!');
    
    // Display created data
    console.log('\n--- Created Users ---');
    users.forEach(user => {
      console.log(`ID: ${user._id}, Name: ${user.name}, Email: ${user.email}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();