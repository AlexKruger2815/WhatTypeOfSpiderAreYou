# Base image for Node.js application
FROM node:18-alpine

# Working directory inside the container
WORKDIR /WebLevelup/src

# Install dependencies based on package.json and package-lock.json (if exists)
RUN npm install

# Copy all project files, including package*.json
COPY . .

# Expose port where the server listens (modify if needed)
EXPOSE 3000

ARG SERVER_NAME
ARG DATABASE_NAME
ARG USERNAME
ARG PASSWORD
ENV SERVER_NAME = ${SERVER_NAME}
ENV DATABASE_NAME = ${DATABASE_NAME}
ENV USERNAME = ${USERNAME}
ENV PASSWORD = ${PASSWORD}

# Start the application (modify command if needed)
CMD [ "node", "server.js" ]