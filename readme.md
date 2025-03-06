# Backend API

A modern, fast backend API built with Bun and Elysia.

## 🚀 Features

- Built with Bun - ultra-fast JavaScript runtime and toolkit
- Elysia.js for routing and middleware
- Built-in SQLite support
- TypeScript support out of the box
- Docker support
- Environment configuration
- CORS enabled
- Health check endpoint
- Request logging
- Error handling

## 📋 Prerequisites

- [Bun](https://bun.sh) (v1.0.30 or higher)
- Docker (optional, for containerized development)

## 🛠 Installation

1. Install Bun (if not already installed):

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Clone the repository:

```bash
git clone <your-repo-url>
cd backend
```

3. Install dependencies:

```bash
bun install
```

4. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

## 🚀 Running the Application

### Development Mode

```bash
bun run dev
```

This will start the server in development mode with hot reloading.

### Production Mode

```bash
bun run start
```

### Using Docker

```bash
docker-compose up
```

## 🔧 Environment Variables

| Variable             | Description                            | Default               |
| -------------------- | -------------------------------------- | --------------------- |
| PORT                 | Server port                            | 3000                  |
| NODE_ENV             | Environment mode                       | development           |
| DB_PATH              | SQLite database path                   | data/database.sqlite  |
| ALLOWED_ORIGINS      | CORS allowed origins                   | http://localhost:3000 |
| LOG_LEVEL            | Logging level                          | DEBUG                 |
| DEFAULT_MIN_QUANTITY | Default minimum quantity for inventory | 5                     |

## 📝 API Endpoints

### Health Check

- GET `/api/health` - Check API health status

### Products

- GET `/api/products` - List all products
- POST `/api/products` - Create a new product
- GET `/api/products/:id` - Get a specific product
- PUT `/api/products/:id` - Update a product
- DELETE `/api/products/:id` - Delete a product

### Categories

- GET `/api/categories` - List all categories
- POST `/api/categories` - Create a new category
- GET `/api/categories/:id` - Get a specific category
- PUT `/api/categories/:id` - Update a category
- DELETE `/api/categories/:id` - Delete a category

### Inventory

- GET `/api/inventory` - List all inventory items
- POST `/api/inventory` - Create a new inventory item
- GET `/api/inventory/:id` - Get a specific inventory item
- PUT `/api/inventory/:id` - Update an inventory item
- DELETE `/api/inventory/:id` - Delete an inventory item

## 🧪 Testing

Run tests:

```bash
bun test
```

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build the image
docker build -t backend-api .

# Run the container
docker run -p 3000:3000 backend-api
```

Or use docker-compose:

```bash
docker-compose up
```

## 📦 Project Structure

```
.
├── src/
│   ├── controllers/   # Request handlers
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── db/           # Database related files
│   ├── config.ts     # Configuration
│   └── server.ts     # Main application file
├── data/             # SQLite database
├── .env              # Environment variables
├── .env.example      # Example environment file
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── Dockerfile        # Docker configuration
└── docker-compose.yml # Docker Compose configuration
```

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Setup and Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/inventory-api.git
   cd inventory-api
   ```

2. Create an `.env` file (you can copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

3. Start the service:

   ```bash
   docker-compose up -d
   ```

4. The API will now be available at `http://localhost:3000/api`

### Using with Multiple Frontend Apps

This service supports CORS and can be accessed from multiple frontend applications.

1. Configure allowed origins in your `.env` file:

   ```
   ALLOWED_ORIGINS=http://localhost:3001,https://yourdomain.com
   ```

2. Use the provided API client in your frontend applications.

## Database Persistence

The SQLite database is stored in the `./data` directory which is mounted as a volume in the Docker container. This ensures your data persists between container restarts and rebuilds.

## Connecting from Frontend Applications

You can use the provided API client or create your own. Here's an example using the provided client:

```javascript
import { InventoryApiClient } from './inventory-api-client'

// Initialize the client
const api = new InventoryApiClient('http://localhost:3000/api')

// Example: Get all products
async function getProducts() {
	try {
		const products = await api.getProducts()
		console.log(products)
	} catch (error) {
		console.error('Error fetching products:', error)
	}
}
```

## Development

### Running Locally (without Docker)

If you want to run the API without Docker:

1. Install Deno: https://deno.land/manual/getting_started/installation

2. Run the server:
   ```bash
   deno run --allow-net --allow-read --allow-write --allow-env src/server.ts
   ```

### Environment Variables

- `PORT`: API server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

## License

[MIT License](LICENSE)
