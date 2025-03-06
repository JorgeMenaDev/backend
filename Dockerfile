# Dockerfile for Deno API
FROM oven/bun:1.0.30

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the server
CMD ["bun", "run", "start"]