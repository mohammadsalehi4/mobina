FROM node:18.16.1-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Set environment variable for Node.js
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Install dependencies in the container
RUN npm install --legacy-peer-deps

# Copy the rest of the application to the container 
COPY . .

# Build the application
RUN npm run build

# Specify the default command to run when the container starts
CMD ["npm", "run", "preview"]
