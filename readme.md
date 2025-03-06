# Inventory API Service

A standalone RESTful API service for inventory management built with Deno and SQLite. This service is designed to be completely independent and can serve multiple frontend applications.

## Features

- Complete inventory management system
- RESTful API with CRUD operations
- SQLite database with persistent storage
- Docker Compose setup for easy deployment
- Cross-Origin Resource Sharing (CORS) support
- Health check endpoint
- Structured project organization

## API Endpoints

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Categories

- `GET /api/categories` - List all product categories

### Inventory

- `GET /api/inventory/low` - Get products with low inventory

### System

- `GET /api/health` - Health check endpoint

## Project Structure

```
inventory-api/
├── .env.example                  # Example environment variables
├── deps.ts                       # Centralized dependencies
├── docker-compose.yml            # Docker Compose configuration
├── Dockerfile                    # Docker container definition
├── README.md                     # This documentation
├── data/                         # Persistent database storage
└── src/
    ├── server.ts                 # Main application entry point
    ├── config.ts                 # Configuration management
    ├── controllers/              # Business logic
    │   ├── product_controller.ts
    │   ├── category_controller.ts
    │   └── inventory_controller.ts
    ├── db/
    │   └── database.ts           # Database connection and initialization
    ├── middleware/
    │   └── index.ts              # Application middleware
    └── routes/                   # API route definitions
        ├── products.ts
        ├── categories.ts
        └── inventory.ts
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
