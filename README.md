# Express TypeScript Bun Template

A modern Express.js template for building TypeScript-based APIs with [Bun](https://bun.sh/).

## Features

- 🚀 **Express.js 5**: Latest Express framework with modern features
- 📝 **TypeScript**: Type safety and modern JavaScript features
- 🔒 **Authentication**: JWT-based auth system built-in
- 🛡️ **Security**: Helmet middleware for enhanced security
- 📊 **Logging**: Custom logger with color support
- 🔄 **Development**: Hot reloading with Bun's watch mode
- 🧩 **Modular**: Well-organized project structure
- 🔌 **Middleware**: Error handling, CORS, and more

## Quick Start

### Create a new project

```bash
bun create ElSierra/bun-express-init my-api
cd my-api
```

This will run the setup script which will prompt you for some basic information to customize your project.

### Start the development server

```bash
bun run dev
```

Visit `http://localhost:3000` to see your API in action.

## Project Structure

```
.
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
├── index.ts             # Application entry point
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Available Scripts

- `bun run dev` - Start development server with hot reloading
- `bun run dev:local` - Start development server with NODE_ENV=development
- `bun run start` - Start production server
- `bun run start:prod` - Start production server with NODE_ENV=production
- `bun run build` - Build the application for production

## Environment Variables

Create a `.env` file in the root directory of your project. See `.env.example` for examples.

```
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_change_this_in_production
JWT_EXPIRES_IN=90d
```

## Authentication

This template includes a basic JWT authentication system:

- `/api/auth/register` - Register a new user
- `/api/auth/login` - Login and receive JWT token
- Protected routes using auth middleware

## Customization

Feel free to modify the template to fit your specific needs. The structure is designed to be flexible and easy to extend.

## License

MIT

## Credits

Created by Isaac Ojo
