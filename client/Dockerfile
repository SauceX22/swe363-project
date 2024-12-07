# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 5173

# Start the client
CMD ["npm", "run", "dev", "--", "--host"]
