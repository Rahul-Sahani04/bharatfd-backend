# Backend Developer Assignment Submission

## Project Overview
A multilingual FAQ management system built with Node.js, Express, and MongoDB, featuring rich text support, caching, and automated translations.

## Requirements Completed

### 1. Model Design ✅
- FAQ model with question and answer fields
- Language-specific translations for Hindi and Bengali
- Dynamic translation retrieval method
- Rich text support for answers

### 2. WYSIWYG Editor Integration ✅
- Integrated CKEditor for rich text formatting
- Support for multilingual content
- HTML content sanitization

### 3. API Development ✅
- REST API with language selection support
- Fast response times with Redis caching
- Example API usage provided below

### 4. Caching Mechanism ✅
- Redis integration for improved performance
- Cache invalidation on updates
- Efficient pre-translation caching

### 5. Multi-language Translation Support ✅
- Google Translate API integration
- Automated translations during creation
- English fallback support

### 6. Admin Panel ✅
- User-friendly admin interface
- CRUD operations for FAQs
- Rich text editing support

### 7. Unit Tests & Code Quality ✅
- Jest test suite with high coverage
- ESLint configuration with TypeScript support
- Code follows ES6+ best practices

### 8. Documentation ✅
- Comprehensive README
- API documentation
- Clear contribution guidelines

### 9. Git Best Practices ✅
- Conventional commit messages
- Clean Git history
- Clear branch organization

### 10. Docker Support ✅
- Dockerfile and docker-compose.yml provided
- Ready for deployment
- Environment configuration included

## API Examples

### Fetch FAQs in English (default)
```bash
curl http://localhost:3000/faqs
```
Response:
```json
{
  "faqs": [
    {
      "question": "What is AI?",
      "answer": "<p>AI stands for <strong>Artificial Intelligence</strong></p>"
    }
  ],
  "lang": "en"
}
```

### Fetch FAQs in Hindi
```bash
curl http://localhost:3000/faqs?lang=hi
```
Response:
```json
{
  "faqs": [
    {
      "question": "एआई क्या है?",
      "answer": "<p>एआई का मतलब <strong>कृत्रिम बुद्धिमत्ता</strong> है</p>"
    }
  ],
  "lang": "hi"
}
```

### Fetch FAQs in Bengali
```bash
curl http://localhost:3000/faqs?lang=bn
```
Response:
```json
{
  "faqs": [
    {
      "question": "এআই কি?",
      "answer": "<p>এআই মানে <strong>কৃত্রিম বুদ্ধিমত্তা</strong></p>"
    }
  ],
  "lang": "bn"
}
```

## Technical Stack
- Node.js with TypeScript
- Express.js for REST API
- MongoDB with Mongoose
- Redis for caching
- Jest for testing
- ESLint + Prettier for code quality
- Docker for containerization

## Running the Project

1. Clone the repository
```bash
git clone https://github.com/yourusername/bharatfd-backend.git
cd bharatfd-backend
```

2. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start with Docker
```bash
docker-compose up --build
```

4. Run tests
```bash
yarn test
```

## Additional Features
- HTML sanitization for security
- Comprehensive error handling
- Type safety with TypeScript
- Efficient caching strategies
- Automated translation pipeline

The project demonstrates expertise in:
- Full-stack development
- API design and implementation
- Database modeling
- Caching strategies
- Internationalization
- Testing and documentation
- Code quality and best practices

Repository: [GitHub Repository Link]
