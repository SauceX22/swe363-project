# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 5000

# Start the development server
CMD ["npm", "run", "dev"]
