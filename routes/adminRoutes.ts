import express from 'express';
import { FAQ } from '../models/FAQ';
import { sanitizeHtml } from '../middleware/sanitizer';

const router = express.Router();

router.get('/admin/faqs', async (req, res) => {
  const faqs = await FAQ.find();
  res.render('admin/manageFaqs', { faqs });
});

router.post('/admin/faqs', sanitizeHtml, async (req, res) => {
  const { id, question, answer } = req.body;
  if (id) {
    await FAQ.findByIdAndUpdate(id, { question, answer });
  } else {
    await FAQ.create({ question, answer });
  }
  res.redirect('/admin/faqs');
});

router.post('/admin/faqs/:id/delete', async (req, res) => {
  await FAQ.findByIdAndDelete(req.params.id);
  res.redirect('/admin/faqs');
});

export default router;
