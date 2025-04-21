# Bun-Express-Backend

A modern, fast Express.js backend starter template powered by Bun runtime.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Bun](https://img.shields.io/badge/Bun-1.2.7-black)
![Express](https://img.shields.io/badge/Express-5.1.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

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
git clone https://github.com/yourusername/bun-express-backend.git

# Change directory
cd bun-express-backend

# Install dependencies
bun install
```

## Quick Start

```bash
# Development mode with hot reload
bun run dev

# Development mode with local environment
bun run dev:local

# Production mode
bun run start:prod

# Build the project
bun run build
```

## Project Structure

```
bun-express-backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Express middlewares
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── utils/        # Utility functions
│       └── logger/   # Logging utilities
├── index.ts          # Application entry point
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Logging System

The project includes a powerful logging system with color support:

```typescript
import { logger } from "./src/utils/logger";

// Different log types with colors
logger.info("Information message"); // Blue
logger.success("Success message"); // Green
logger.warn("Warning message"); // Yellow
logger.error("Error message"); // Red
logger.debug("Debug message"); // Cyan
logger.server("Server message"); // Magenta
logger.important("Important message"); // Bold white
```

## VS Code Integration

### Logging Shortcut

This project includes a custom VS Code keyboard shortcut for quick logging:

1. Press `Ctrl+Shift+L` to automatically insert a logger.info call with the current selection
2. If nothing is selected, it will insert a basic logger.info template

To set up this shortcut, follow the instructions in the "VS Code Setup" section below.

## VS Code Setup

### Add keyboard shortcut for logging

1. Open VS Code
2. Go to File > Preferences > Keyboard Shortcuts
3. Click on the "Open Keyboard Shortcuts (JSON)" button in the top right
4. Add the following configuration:

```json
{
  "key": "ctrl+shift+l",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "logger.info(${TM_SELECTED_TEXT:$1});"
  }
}
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1d
ENABLE_LOGS=true
```

## License

MIT
