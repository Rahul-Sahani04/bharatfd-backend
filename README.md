# BharatFD Backend

## Overview
This is a backend application for managing FAQs with multilingual support using Node.js, Express, and MongoDB. The system supports automatic translation of FAQs into multiple languages and includes an admin interface for content management.

## Features
- Store and manage FAQs with multilingual translations
- Automatic translation support for Hindi and Bengali
- Redis-based caching for improved performance
- Admin interface for FAQ management
- REST API with comprehensive endpoints
- Docker support for easy deployment
- TypeScript for type safety
- Unit tests using Jest
- ESLint for code quality

## Prerequisites
- Node.js >= 14
- MongoDB
- Redis
- Bun (for running TypeScript directly)

## Installation

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Rahul-Sahani04/bharatfd-backend.git
   cd bharatfd-backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file with the following environment variables:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/faq

   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_USERNAME=default
   REDIS_PASSWORD=your_password

   # Server Configuration
   PORT=3000

   # Optional: Google Translate API key if needed
   GOOGLE_TRANSLATE_API_KEY=your_api_key
   ```

4. Start the application:
   ```bash
   bun run start
   ```

### Docker Setup
1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

The application will be available at `http://localhost:3000`.

## API Documentation

### FAQ Endpoints

#### Get all FAQs
```bash
GET /faqs
```
Query Parameters:
- `lang`: Language code (en, hi, bn) - defaults to 'en'

Response:
```json
{
  "faqs": [
    {
      "question": "What is BharatFD?",
      "answer": "BharatFD is a financial platform..."
    }
  ],
  "lang": "en"
}
```

#### Create a new FAQ
```bash
POST /faqs
Content-Type: application/json

{
  "question": "What is BharatFD?",
  "answer": "BharatFD is a financial platform..."
}
```
Note: Translations to Hindi and Bengali are generated automatically.

#### Clear Cache
```bash
GET /clear-cache
```
Clears the Redis cache for all FAQs.

### Admin Endpoints

#### View FAQ Management Interface
```bash
GET /admin/faqs
```
Returns the admin interface for managing FAQs.

#### Create/Update FAQ
```bash
POST /admin/faqs
Content-Type: application/json

{
  "id": "existing-faq-id", // Optional, include for updates
  "question": "New question",
  "answer": "New answer"
}
```

#### Delete FAQ
```bash
POST /admin/faqs/:id/delete
```

## Development

### Running Tests
```bash
bun test
```

### Linting
```bash
# Check for linting issues
bun run lint

# Fix auto-fixable issues
bun run lint:fix
```

## Docker Commands

### Start all services
```bash
docker-compose up
```

### Rebuild and start
```bash
docker-compose up --build
```

### Stop all services
```bash
docker-compose down
```

## Project Structure
```
bharatfd-backend/
├── routes/           # API routes
├── models/           # MongoDB models
├── views/            # Admin interface views
├── __tests__/        # Test files
└── data/            # Sample data
```

## Contributing

### Setup Development Environment
1. Fork the repository
2. Clone your fork
3. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
4. Install dependencies:
   ```bash
   bun install
   ```

### Development Guidelines
1. Follow TypeScript best practices
2. Maintain 100% test coverage for new features
3. Follow the existing code style
4. Use meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
5. Update documentation for any new features

### Pull Request Process
1. Update the README.md with details of changes if needed
2. Add tests for new features
3. Ensure all tests pass and linting is clean
4. Update relevant documentation
5. Submit a pull request with a clear description of the changes

### Code Style
- Use TypeScript features appropriately
- Follow ESLint rules configured in the project
- Use async/await for asynchronous operations
- Add proper error handling
- Include JSDoc comments for functions

## License
This project is licensed under the MIT License.
