# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Create data directory for localStorage
RUN mkdir -p data

# Expose the port the app will run on
EXPOSE 3001

# Start the app
CMD ["node", "main.js"]
