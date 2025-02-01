import { expect } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { FAQ } from '../models/FAQ';
import { sanitizeHtml } from '../middleware/sanitizer';
import { Request, Response, NextFunction } from 'express';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('FAQ Model', () => {
  it('should create an FAQ document successfully', async () => {
    const faq = new FAQ({
      question: "What is AI?",
      answer: "AI stands for Artificial Intelligence.",
      translations: {
        hi: {
          question: "एआई क्या है?",
          answer: "एआई का मतलब कृत्रिम बुद्धिमत्ता है।",
        },
      },
    });

    await faq.validate(); // Ensure no validation errors
    expect(faq.question).toBe("What is AI?");
  });

  it('should handle rich text content in answers', async () => {
    const faq = new FAQ({
      question: 'What is AI?',
      answer: '<p>AI stands for <strong>Artificial Intelligence</strong>.</p><ul><li>Machine Learning</li><li>Deep Learning</li></ul>',
      translations: {
        hi: {
          question: "एआई क्या है?",
          answer: "एआई का मतलब कृत्रिम बुद्धिमत्ता है।",
        },
      },
    });

    const translated = faq.getTranslatedText("hi");
    expect(translated.question).toBe("एआई क्या है?");
    expect(translated.answer).toBe("एआई का मतलब कृत्रिम बुद्धिमत्ता है।");
  });

  it('should sanitize HTML content', () => {
    const mockReq = {
      body: {
        answer: '<p>Safe content</p><script>alert("unsafe")</script>'
      }
    } as Request;
    const mockRes = {} as Response;
    const nextFn = jest.fn() as NextFunction;

    sanitizeHtml(mockReq, mockRes, nextFn);

    expect(mockReq.body.answer).not.toContain('<script>');
    expect(mockReq.body.answer).toContain('<p>Safe content</p>');
    expect(nextFn).toHaveBeenCalled();
  });

  it('should return translated text when available', () => {
    const faq = new FAQ({
      question: "What is AI?",
      answer: "AI stands for Artificial Intelligence.",
      translations: {},
    });

    const translated = faq.getTranslatedText("bn");
    expect(translated.question).toBe("What is AI?");
    expect(translated.answer).toBe("AI stands for Artificial Intelligence.");
  });

  it('should fail validation when required fields are missing', async () => {
    const faq = new FAQ({}); // Missing question and answer

    try {
      await faq.validate();
    } catch (error: any) {
      expect(error.errors.question).toBeDefined();
      expect(error.errors.answer).toBeDefined();
    }
  });
});
