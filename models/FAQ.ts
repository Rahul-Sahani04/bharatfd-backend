import { Schema, model, Document } from 'mongoose';

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      hi: {
        question: { type: String },
        answer: { type: String },
      },
      bn: {
        question: { type: String },
        answer: { type: String },
      },
    },
  },
  { timestamps: true }
);

faqSchema.methods.getTranslatedText = function (lang: string) {
  if (this.translations[lang]) {
    return {
      question: this.translations[lang].question,
      answer: this.translations[lang].answer,
    };
  }
  return { question: this.question, answer: this.answer };
};

export interface Translations {
  hi: { question: string; answer: string };
  bn: { question: string; answer: string };
}

export interface FAQDocument extends Document {
  question: string;
  answer: string;
  translations: Translations;
  getTranslatedText(lang: string): { question: string; answer: string };
}

export const FAQ = model<FAQDocument>('FAQ', faqSchema);
