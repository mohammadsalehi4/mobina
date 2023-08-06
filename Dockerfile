FROM node:18.16.1-bullseye
# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]