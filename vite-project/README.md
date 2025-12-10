Social Network Application
📱 About the Application
A modern social networking web application built with a focus on TypeScript and practical skills using React + Vite + TanStack. The application demonstrates real-world development practices with a complete feature set.

Live Demo: https://dmitryshastel.github.io/Social-Network-TanStack/

🚀 Technology Stack
React 19 - UI library for building user interfaces

TypeScript - Strict typing and improved code reliability

Vite - Modern build tool and development server

TanStack Router - Client-side routing

TanStack Query - Async state management

MobX - State management

Emotion - CSS-in-JS for styling

Zod - Schema and type validation

WebSocket - Real-time messaging

✨ Core Features
📋 Application Pages
Posts Feed (/)

Infinite scroll posts display

Post cards with author info, title, and preview

Like/unlike functionality

Modal view for full post details

Loading states and error handling

User Profile (/users/$userId)

View any user's profile

Display user information: avatar, name, bio, join date

Show user's posts list

"Edit Profile" button for own profile

Sign In (/auth/login)

Login form with validation

Email/Username and password fields

Form validation with Zod

Error handling for invalid credentials

Redirect after successful login

Sign Up (/auth/register)

Registration form with validation

Name, email, password, and confirm password fields

Form validation with Zod

Redirect after successful registration

Edit Profile (/users/$userId/edit)

Protected route (authenticated users only)

Edit personal information: name, bio, avatar

Form validation with Zod

Save changes with loading states

Messaging (/message/$userId) - Extra Credit

Real-time messaging via WebSocket

One-to-one conversation interface

Message history from API

Send/receive messages in real-time

Connection status indicator

🎯 Key Features
Strict TypeScript Typing - Full type safety throughout the application

Modular Architecture - Well-organized project structure

Real-time Communication - WebSocket integration for messaging

Form Validation - Comprehensive validation using Zod schemas

Responsive Design - Mobile-friendly interface

State Management - Efficient state handling with MobX

API Integration - Async data fetching with TanStack Query

🛠️ Project Setup
Prerequisites
Node.js 18+

npm or yarn

Installation
bash
# Clone the repository
git clone https://github.com/DmitryShastel/Social-Network-TanStack.git

# Navigate to project directory
cd Social-Network-Application---TypeScript-TanStack/vite-project

# Install dependencies
npm install

# Start development server
npm run dev
Development Scripts
bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run TypeScript type checking
npm run type-check

# Run linter
npm run lint

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Format code
npm run format

# Generate TanStack Router routes
npm run generate:routes
📁 Project Structure
text
src/
├── modules/              # Feature modules
│   ├── auth/            # Authentication
│   ├── home/            # Home page & posts feed
│   ├── message/         # Messaging module
│   ├── posts/           # Posts functionality
│   ├── users/           # User profiles
│   └── tests/           # Test files
├── routes/              # TanStack Router routes
├── stores/              # MobX stores
├── shared/              # Shared components & utilities
├── styles/              # Global styles & Emotion
└── types/               # TypeScript type definitions
🚀 Deployment
Deploy to GitHub Pages
The application is configured for automatic deployment to GitHub Pages:

bash
# Build and deploy
npm run deploy
Deployment Configuration
Build Output: dist/ directory

GitHub Pages Branch: main

Base Path: /Social-Network-TanStack/

Live URL: https://dmitryshastel.github.io/Social-Network-TanStack/

Manual Deployment Steps
Ensure your code is pushed to GitHub:

bash
git add .
git commit -m "Deploy preparation"
git push origin main
Build and deploy:

bash
npm run deploy
Configure GitHub Pages:

Go to repository Settings → Pages

Source: Deploy from a branch

Branch: main

Folder: / (root)

Save

🧪 Testing
The project includes comprehensive testing setup:

bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate test coverage report
npm run test:coverage
📦 Dependencies
Core Dependencies
@tanstack/react-router - Routing

@tanstack/react-query - Data fetching

mobx & mobx-react-lite - State management

@emotion/react & @emotion/styled - Styling

react-hook-form & zod - Form handling

react-toastify - Notifications

Development Dependencies
@tanstack/router-plugin - Route generation

vitest & jsdom - Testing

eslint & prettier - Code quality

husky & lint-staged - Git hooks

gh-pages - Deployment

🔧 Configuration Files
vite.config.ts - Vite build configuration

tsconfig.json - TypeScript configuration

eslint.config.ts - ESLint configuration

vitest.config.ts - Test configuration

🎯 Learning Objectives
This project focuses on:

TypeScript Mastery - Strict typing throughout the codebase

Modern React Patterns - Hooks, context, and composition

State Management - Efficient state handling with MobX

Routing - Declarative routing with TanStack Router

Async Operations - Data fetching with TanStack Query

Real-time Features - WebSocket integration

Testing - Comprehensive test coverage

Deployment - CI/CD with GitHub Pages

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👤 Author
Dmitry Shastel

GitHub: @DmitryShastel

Project: Social Network Application

🙏 Acknowledgments
TanStack for amazing React tools

Vite for the excellent build tool

DummyJSON for the mock API data