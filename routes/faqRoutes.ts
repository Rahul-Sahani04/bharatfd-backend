import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { FAQ, FAQDocument } from '../models/FAQ';
import translate from 'google-translate-api-x';
import { createClient } from 'redis';

const router = express.Router();

const client = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
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

router.get('/clear-cache', async (req: Request, res: Response) => {
  try {
    await client.flushAll();
    res.status(200).send('Cache cleared');
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

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
    // client.setEx(`faqs_${lang}`, 3600, JSON.stringify(translatedFaqs));
    res.json({ faqs: translatedFaqs, lang: lang || 'en' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});


// Create a new FAQ
router.post('/faqs', async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const faq = new FAQ({ question, answer });

    console.log(question, answer);


    // Translate and save
    const hiTranslation = await translate(question, { to: 'hi', autoCorrect: true });
    const bnTranslation = await translate(question, { to: 'bn', autoCorrect: true });

    const hiAnswerTranslation = await translate(answer, { to: 'hi', autoCorrect: true });
    const bnAnswerTranslation = await translate(answer, { to: 'bn', autoCorrect: true });


    console.log("English Question: ", hiTranslation);

    console.log("Hindi Question: ", hiTranslation.text);
    console.log("Hindi Answer: ", hiAnswerTranslation.text);

    console.log("Bengali Question: ", bnTranslation.text);
    console.log("Bengali Answer: ", bnAnswerTranslation.text);


    faq.translations = {
      hi: {
        question: hiTranslation.text,
        answer: hiAnswerTranslation.text,
      },
      bn: {
        question: bnTranslation.text,
        answer: bnAnswerTranslation.text,
      },
    };

    await faq.save();
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
