# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript
RUN npm run tsc

# Expose the port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "server"]
