---
name: Backend Developer Assignment Submission
about: Template for submitting the FAQ Management System assignment
title: '[BACKEND] FAQ Management System Submission'
labels: backend
assignees: theakshaydhiman
---

# Backend Assignment Submission

## Repository Link
[Insert your GitHub repository link here]

## Implementation Details

I have implemented a multilingual FAQ management system with the following features:

### Core Requirements
- [x] FAQ model with multilingual support
- [x] WYSIWYG editor (CKEditor) integration
- [x] REST API with language selection
- [x] Redis caching for performance
- [x] Google Translate API integration
- [x] Admin panel with CRUD operations
- [x] Unit tests with Jest
- [x] Docker support
- [x] ESLint configuration
- [x] Comprehensive documentation

### API Endpoints
The API supports the following endpoints with language selection:

```bash
# English (default)
GET http://localhost:3000/faqs

# Hindi
GET http://localhost:3000/faqs?lang=hi

# Bengali
GET http://localhost:3000/faqs?lang=bn
```

### Technical Highlights
- TypeScript for type safety
- Express.js for REST API
- MongoDB with Mongoose
- Redis for caching
- Jest for testing
- Docker for containerization
- HTML sanitization for security

### Additional Features
- Rich text support with security measures
- Efficient caching strategies
- Automated translation pipeline
- Comprehensive error handling
- Type safety throughout the codebase

## Running the Project
1. Clone the repository
2. Configure environment variables
3. Run with Docker: `docker-compose up --build`
4. Access API at `http://localhost:3000`

## Testing
All tests pass successfully:
```bash
yarn test
```

## Notes for Reviewers
- The project follows all specified requirements
- Code is well-documented and follows best practices
- All features are thoroughly tested
- Docker setup is included for easy deployment

/cc @theakshaydhiman
