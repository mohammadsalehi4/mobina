# Use the specified Node.js version
FROM node:18.16.1-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies in the container
RUN npm install --legacy-peer-deps

# Copy the rest of the application to the container 
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Set the script as the ENTRYPOINT
ENTRYPOINT ["/entrypoint.sh"]

# Build the application
# RUN npm run build

# Specify the default command to run when the container starts
# CMD ["npm", "run", "preview"]
