# Use a Node.js base image
FROM node:22.4.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one)
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm i

# Copy the rest of your application code
COPY . .

# Build your Next.js application
RUN pnpm run build

# Start the Next.js application
CMD ["pnpm", "run", "start"]
