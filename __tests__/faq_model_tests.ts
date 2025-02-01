import { expect } from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { FAQ } from "../models/FAQ";

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

describe("FAQ Model", () => {
  it("should create an FAQ document successfully", async () => {
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

  it("should return translated text when available", () => {
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

    const translated = faq.getTranslatedText("hi");
    expect(translated.question).toBe("एआई क्या है?");
    expect(translated.answer).toBe("एआई का मतलब कृत्रिम बुद्धिमत्ता है।");
  });

  it("should return default text if translation is unavailable", () => {
    const faq = new FAQ({
      question: "What is AI?",
      answer: "AI stands for Artificial Intelligence.",
      translations: {},
    });

    const translated = faq.getTranslatedText("bn");
    expect(translated.question).toBe("What is AI?");
    expect(translated.answer).toBe("AI stands for Artificial Intelligence.");
  });

  it("should fail validation when required fields are missing", async () => {
    const faq = new FAQ({}); // Missing question and answer

    try {
      await faq.validate();
    } catch (error: any) {
      expect(error.errors.question).toBeDefined();
      expect(error.errors.answer).toBeDefined();
    }
  });
});
