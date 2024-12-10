# SWE363 Project 🚀

Welcome to the SWE363 Project! This setup includes both **client** and **server** components, designed for ease of development and deployment. Let’s dive in and get started! 🏊‍♂️

---

## 📁 Project Structure

We have split the application into two main parts:

1. **Client**: The frontend, built with **Vite**, **React**, **TailwindCSS**, and **shadcn/ui** components.
2. **Server**: The backend, powered by **Express, ****MongoDB** (using Mongoose), and Clerk for authentication.

Each part has its own configuration, dependencies, and environment variables for easy separation and development.

---

## 🚀 Quickstart Guide

### **Client Setup**

1. **Navigate to the Client Directory**

```bash
cd client
```

2. **Install Dependencies**

```bash
npm install
```

3. **Run the Client**

```bash
npm run dev
```

This will start the client on [http://localhost:5173](http://localhost:5173). 🌐

---

### **Server Setup**

1. **Navigate to the Server Directory**

```bash
cd server
```

2. **Install Dependencies**

```bash
npm install
```

3. **Run MongoDB Database**

From the root directory, start MongoDB using Docker:

```bash
docker compose up -d --build mongodb
```

4. **Run the Server**

```bash
npm run dev
```

This will start the server on [http://localhost:5000](http://localhost:5000). 🖥️

🎉 You're all set, now you can make requests to the server using the provided `.http` files in the repository. 🎉

## 🔑 Authentication System (GRADER IMPORTANT!)

### **Clerk Authentication (Production)**

This project uses **Clerk** for authentication. This requires requests to include Clerk headers, which are managed by the front-end integration. However, since this project phase focuses solely on the backend, an alternative authentication system has been implemented for development and testing, it works as folows:

### **Development Authentication**

A simple authentication system is included for local testing:

1. **Register**

   - Use the `/auth/register` endpoint.
   - Provide an email address to register a user.
   - Example request:
     ```json
     POST /auth/register
     {
       "email": "test@example.com"
     }
     ```

2. **Login**

   - Use the `/auth/login` endpoint.
   - Provide the same email address to log in.
   - The server will respond with a token (the user ID).
   - Example response:
     ```json
     {
       "message": "Login successful",
       "token": "user-id-token"
     }
     ```

3. **Using the Token**

   - Include the token in the `Authorization` header for all protected endpoints:
     ```
     Authorization: Bearer user-id-token
     ```
   - This simulates user authentication and allows access to protected resources.

---

## 🛠️ Testing with REST Client (GRADER IMPORTANT!)

Although you can test the backend using postman, to make testing easier, we’ve included `.http` files in the repository. These files can be used with the **REST Client** extension in VS Code to run sample requests.

### **Setup REST Client**

1. Install the **REST Client** extension from the ****[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)****.
2. Open any **.http** file in the backend folder, under /http
3. Click on t**he s**mall **\`Send Request\`** button above each request in the file to test the endpoints.

### Testing Endpoints

- Use the provided `.http` files to test registration, login, market, and other authenticated/unauthenticated requests.

---

## 📝 Environment Variables (GRADER IMPORTANT!)

All required environment variables are already included in the repository for testing purposes. These variables are pre-configured to ensure the backend works seamlessly. ⚠️ **Note:** Including sensitive keys in a repository is not a secure practice for production; this setup is for grader testing only.

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
