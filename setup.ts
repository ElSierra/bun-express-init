#!/usr/bin/env bun

import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    readline.question(query, (answer) => {
      resolve(answer);
    });
  });
};

async function setup() {
  console.log(
    "\n🚀 Setting up your Express.js + TypeScript project with Bun!\n"
  );

  // Get project information
  const projectName =
    (await question("Project name (bun-express-app): ")) || "bun-express-app";
  const projectDescription =
    (await question("Project description: ")) ||
    "Express.js API with TypeScript and Bun";
  const authorName = (await question("Author name: ")) || "";
  const authorEmail = (await question("Author email: ")) || "";

  // Update package.json
  console.log("\n📝 Updating package.json...");
  const packageJsonPath = join(process.cwd(), "package.json");

  if (existsSync(packageJsonPath)) {
    const packageJson = await Bun.file(packageJsonPath).json();

    packageJson.name = projectName;
    packageJson.description = projectDescription;
    packageJson.private = true;

    if (authorName || authorEmail) {
      packageJson.author =
        authorName + (authorEmail ? ` <${authorEmail}>` : "");
    }

    // Reset version
    packageJson.version = "1.0.0";

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Create .env file if it doesn't exist
  const envPath = join(process.cwd(), ".env");
  if (!existsSync(envPath)) {
    console.log("\n📄 Creating .env file...");
    writeFileSync(
      envPath,
      `PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_change_this_in_production
JWT_EXPIRES_IN=90d
`
    );
  }

  // Create .env.example if it doesn't exist
  const envExamplePath = join(process.cwd(), ".env.example");
  if (!existsSync(envExamplePath)) {
    console.log("📄 Creating .env.example file...");
    writeFileSync(
      envExamplePath,
      `PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_change_this_in_production
JWT_EXPIRES_IN=90d
`
    );
  }

  // Initialize git repository if it doesn't exist
  const gitPath = join(process.cwd(), ".git");
  if (!existsSync(gitPath)) {
    console.log("\n📦 Initializing Git repository...");
    try {
      execSync("git init", { stdio: "ignore" });
      writeFileSync(
        join(process.cwd(), ".gitignore"),
        `# Logs
logs
*.log
npm-debug.log*

# Dependencies
node_modules/
.npm

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.*.local

# Bun files
.bun

# Editor directories and files
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS files
.DS_Store
Thumbs.db
`
      );
    } catch (error) {
      console.warn(
        "⚠️ Could not initialize Git repository. You can do it manually later."
      );
    }
  }

  console.log("\n✅ Setup complete!");
  console.log("\n🏃‍♂️ To start the development server, run:");
  console.log("  bun run dev");
  console.log(
    "\n📚 Read the README.md for more information about the project."
  );

  readline.close();
}

setup().catch((error) => {
  console.error("❌ Error during setup:", error);
  process.exit(1);
});
