# 📝 Full-Stack Todo Application

A modern, responsive todo application built with Next.js, React, and MongoDB. This full-stack solution provides a seamless task management experience with real-time updates, beautiful UI, and robust data persistence.

## ✨ Features

- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **⚡ Real-time Updates** - Instant task synchronization without page refreshes
- **🎨 Modern UI** - Clean, intuitive interface built with Tailwind CSS
- **📊 Task Management** - Create, edit, delete, and mark tasks as complete
- **🔍 Smart Filtering** - Filter tasks by status (All, Active, Completed)
- **💾 Persistent Storage** - Reliable data storage with MongoDB
- **🚀 Fast Performance** - Optimized with Next.js App Router and Server Components

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with hooks and context
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions

### Backend
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API endpoints
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for data persistence
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling

### Development Tools
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting

## 📸 Screenshots

### Login Page
![Desktop Dashboard](public/assets/1.png)

### To-Do List Page
![Mobile Interface](public/assets/2.png)

### To-Do Detail Page
![Task Management](public/assets/3.png)

### Completed To-Do History
![Dark Mode](public/assets/4.png)

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/singhkrishna01/Frontend-To-Do
   cd Frontend-To-Do
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/todoapp
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
   
   ```

4. **Set up MongoDB**
   
   **Option A: Local MongoDB**
   - Install MongoDB Community Server
   - Start MongoDB service:
     ```bash
     # macOS
     brew services start mongodb-community
     
     # Linux
     sudo systemctl start mongod
     
     # Windows
     net start MongoDB
     ```
   
   **Option B: MongoDB Atlas (Cloud)**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get connection string and update `MONGODB_URI`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build the application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run type-check` | Run TypeScript type checking |

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | Fetch all todos |
| `POST` | `/api/todos` | Create a new todo |
| `PUT` | `/api/todos/[id]` | Update a specific todo |
| `DELETE` | `/api/todos/[id]` | Delete a specific todo |


## 🎨 Customization

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended spacing scale
- Custom font families
- Responsive breakpoints

## 🔄 State Management

The application uses React's built-in state management:
- **useState** for component-level state
- **useEffect** for side effects and API calls
- **Context API** for global state (theme, user preferences)


## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Issues**
```bash
# Check if MongoDB is running
mongosh
# or
mongo --version
```

**Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000
# or use different port
npm run dev -- -p 3001
```

**Environment Variables**
- Ensure `.env` file exists
- Check MongoDB URI format
- Restart development server after changes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Vercel** for hosting and deployment platform
- **MongoDB** for the robust database solution
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

If you have any questions or need help getting started:

- 📧 **Email**: krishna00cs@gmail.com
- 💬 **Portfolio**: [krishna-singh.netlify.app](krishna-singh.netlify.app)
