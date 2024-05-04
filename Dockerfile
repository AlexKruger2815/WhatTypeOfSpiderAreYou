# Base image for Node.js application
FROM node:18-alpine

# Working directory inside the container
WORKDIR /WebLevelup/src

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port where the server listens (modify if needed)
EXPOSE 3000

# Start the application (modify command if needed)
CMD [ "node", "server.js" ]