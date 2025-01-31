import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { FAQ, FAQDocument } from '../models/FAQ';
import translate from 'google-translate-api';
import { createClient } from 'redis';

const router = express.Router();
const client = createClient({
  username: 'default',
  password: 'EbB7xaBolkXUU3X4zDfuERlyu2fuXeEy',
  socket: {
      host: 'redis-18957.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
      port: 18957
  }
});

client.on('error', (err: Error) => {
  console.error('Redis error:', err);
});

client.connect().catch(console.error);

// Middleware to check cache
const checkCache = (req: Request, res: Response, next: NextFunction) => {
  const { lang } = req.query;
  client.get(`faqs_${lang}`).then((data: string | null) => {
    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  }).catch((err: Error) => {
    throw err;
  });
};

// Get all FAQs
router.get('/faqs', checkCache, async (req: Request, res: Response) => {
  try {
    const { lang } = req.query;
    const faqs = await FAQ.find();
    const translatedFaqs = await Promise.all(
      faqs.map(async (faq) => {
        const translatedText = faq.getTranslatedText(lang as string);
        return {
          question: translatedText.question,
          answer: translatedText.answer,
        };
      })
    );
    client.setEx(`faqs_${lang}`, 3600, JSON.stringify(translatedFaqs));
    res.json(translatedFaqs);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});


// Create a new FAQ
router.post('/faqs', async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const faq = new FAQ({ question, answer });

    // Translate and save
    const [hiTranslation, bnTranslation] = await Promise.all([
      translate(question, { to: 'hi' }),
      translate(answer, { to: 'hi' }),
      translate(question, { to: 'bn' }),
      translate(answer, { to: 'bn' }),
    ]);

    console.log(hiTranslation, bnTranslation);

    faq.translations = {
      hi: {
        question: hiTranslation[0].text,
        answer: hiTranslation[1].text,
      },
      bn: {
        question: bnTranslation[0].text,
        answer: bnTranslation[1].text,
      },
    };

    await faq.save();
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
