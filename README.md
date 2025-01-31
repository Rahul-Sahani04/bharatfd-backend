# BharatFD Backend

## Overview
This is a backend application for managing FAQs with multilingual support using Node.js, Express, and MongoDB.

## Features
- Store and manage FAQs with multilingual translations.
- WYSIWYG editor support for rich text formatting.
- REST API for managing FAQs.
- Caching mechanism using Redis.
- Automated translations using Google Translate API.
- Unit tests using Mocha and Chai.
- Docker support for containerization.

## Installation

### Prerequisites
- Node.js
- MongoDB
- Redis

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bharatfd-backend.git
   cd bharatfd-backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file with the following content:
   ```env
   MONGODB_URI=mongodb://localhost:27017/faq
   REDIS_URL=redis://localhost:6379
   ```

4. Start the application:
   ```bash
   bun run index.ts
   ```

## API Usage

### Fetch FAQs in English (default)
```bash
curl http://localhost:3000/api/faqs/
```

### Fetch FAQs in Hindi
```bash
curl http://localhost:3000/api/faqs/?lang=hi
```

### Fetch FAQs in Bengali
```bash
curl http://localhost:3000/api/faqs/?lang=bn
```

## Running Tests
To run the unit tests, use the following command:
```bash
bun test
```

## Linting
To lint the code, use the following command:
```bash
bun run lint
```

To fix linting errors, use the following command:
```bash
bun run lint:fix
```

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'feat: Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License.
