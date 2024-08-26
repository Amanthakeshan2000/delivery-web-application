FROM node:18.18.2-alpine3.18

# Set the working directory
WORKDIR /app

# Copy the application code to the container

COPY . .

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# Expose the port on which the application will run
EXPOSE 2000

# Start the application
CMD ["pnpm", "preview"]
