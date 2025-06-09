
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Todo = require('../models/Todo');
const connectDB = require('../config/database');

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Todo.deleteMany({});

    console.log('Existing data cleared...');

    const users = await User.create([
      {
        name: 'krishna',
        email: 'krish@example.com',
        password: '123456'
      },
      {
        name: 'kshitij',
        email: 'kshitij@example.com',
        password: '123456'
      },
      {
        name: 'gautam',
        email: 'gautam@example.com',
        password: '123456'
      },
      {
        name: 'keshav',
        email: 'keshav@example.com',
        password: '123456'
      },
      {
        name: 'mayank',
        email: 'mayank@example.com',
        password: '123456'
      }
    ]);

    console.log('Users created...');

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