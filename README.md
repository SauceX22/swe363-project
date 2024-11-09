# SWE363 Project 🚀

Welcome to the SWE363 Project! This setup includes both **client** and **server** components, designed for ease of development and deployment. Let’s dive in and get started! 🏊‍♂️

---

## 📁 Project Structure

We have split the application into two main parts:

1. **Client**: The frontend, built with **Vite**, **React**, **TailwindCSS**, and **shadcn/ui** components.
2. **Server**: The backend, powered by **Express** and **MongoDB** (using Mongoose).

Each part has its own configuration, dependencies, and environment variables for easy separation and development.

---

## 🚀 Quickstart Guide

### 1. Clone the Repository
```bash
git clone https://github.com/SauceX22/swe363-project.git swe363-project
cd swe363-project
```

### 2. Install Dependencies

- Navigate to each directory (`client` and `server`) and install dependencies:

#### For the Client
```bash
# From the root directory
cd client
npm install
```

```

### 3. Run the Application

#### Client
```bash
# From the client directory
npm run dev
```

This will start the client on `http://localhost:5173` by default. 🌐


---

## ✨ Client Side

### 🛠 Tools and Technologies
The client is set up with **Vite** for fast builds and **React** for the component-based structure. Here’s a rundown of the main tools:

- **[shadcn/ui](https://ui.shadcn.com/)**: A key UI component library based on Radix, used to build accessible and unstyled components. Refer to the shadcn UI docs for setup, usage, and customization.
- **TailwindCSS**: For utility-first styling
- **@tanstack/react-query**: Data fetching and caching
- **@tanstack/react-router**: Routing for modern Single Page Applicationss
- **Zod**: Schema validation
- **Lucide Icons**: Sleek and modern icons
- **Vite**: Fast build tooling for optimized performance

### 📜 Package Scripts
- **`npm run dev`**: Runs the app in development mode with hot reloading.
- **`npm run build`**: Builds the app for production, bundling and minifying everything.
- **`npm run preview`**: Previews the production build.

### 🔧 Client Environment Variables
For the client, any environment variables can be added in `.env` files. You can use `.env.example` as a reference to set up any specific variables you may need.

### 📖 Additional Resources
- [shadcn UI Documentation](https://ui.shadcn.com/): Primary documentation for setting up and customizing UI components.
- [TailwindCSS Documentation](https://tailwindcss.com/docs): Comprehensive resource for Tailwind styling.
- [TanStack React Query](https://tanstack.com/query/latest): Learn more about data fetching and caching.
- [TanStack React Router](https://tanstack.com/router/latest): Detailed docs for routing and navigation.

---

## 🌐 Server Side

### 🛠 Tools and Technologies
Our server is set up with **Express** and **Mongoose** to manage MongoDB interactions, along with:

- **JWT Authentication**: Secure token-based authentication
- **Express Validator**: Middleware for validating requests
- **TypeScript**: For type safety and improved code readability
- **BcryptJS**: Password hashing

### 📜 Package Scripts
- **`npm run server`**: Runs the server in development mode, using `nodemon` for automatic restarts.
- **`npm run build`**: Compiles TypeScript to JavaScript.
- **`npm run start`**: Starts the compiled server for production.

### 🔧 Server Environment Variables
For the server, make sure you configure the following variables in a `.env` file in the `server` directory:

- **`PORT`**: The port on which the server will run (default is `5000`)
- **`MONGO_URI`**: MongoDB connection URI
- **`JWT_SECRET`**: Secret key for signing JWTs

Use `.env.example` in the server directory to guide your setup.

---

## 📝 Notes

- **Code Quality**: We’ve set up **ESLint** and **Prettier** to help maintain code consistency. Run `npm run lint` to check for any issues.
- **Hot Reloading**: Both client and server are configured to hot-reload in development for fast iterations.
- **Docker**: While Docker support is in progress, you can start each service individually with `npm run dev` for the client and `npm run server` for the server.
