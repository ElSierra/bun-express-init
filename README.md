# Express TypeScript Bun Template

A modern Express.js template for building TypeScript-based APIs with [Bun](https://bun.sh/).

## Features

- ⚡️ **Ultra-fast** - Powered by Bun runtime (3-4x faster than Node.js)
- 🔒 **Secure** - Includes Helmet middleware for enhanced security
- 🌈 **Colorful Logs** - Integrated colored console logging
- 🔄 **Hot Reload** - Automatic restart for fast development
- 🧩 **TypeScript** - Full TypeScript support
- 🔐 **JWT Auth** - Built-in JWT authentication system
- 🛣️ **Structured Routes** - Organized route management
- 📝 **Advanced Logging** - Customizable logging with colors

## Installation

```bash
# Clone the repository
git clone https://github.com/ElSierra/bun-express-init

# Change directory
cd bun-express-backend

# Install dependencies
bun install
```

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
