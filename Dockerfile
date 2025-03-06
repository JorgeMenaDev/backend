# Dockerfile for Deno API
FROM denoland/deno:1.40.2

# Set working directory
WORKDIR /app

# Create data directory for SQLite database
RUN mkdir -p /app/data

# Copy configuration files first for better caching
COPY deno.json import_map.json ./

# Copy dependency file
COPY deps.ts .
RUN deno cache deps.ts

# Copy source code
COPY src/ ./src/

# Verify installation
RUN deno --version

# Cache application code
RUN deno cache src/server.ts

# Set permissions
RUN chmod -R 755 /app

# Expose the API port
EXPOSE 3000

# Run the API server
CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "src/server.ts"]