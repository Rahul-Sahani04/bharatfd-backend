import { Request, Response, NextFunction } from 'express';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const allowedTags = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
  'strong', 'em', 'u', 'strike', 'sub', 'sup',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'a', 'img'
];

const allowedAttributes = {
  '*': ['class', 'style'],
  'a': ['href', 'target', 'rel'],
  'img': ['src', 'alt', 'width', 'height']
};

export const sanitizeHtml = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && req.body.answer) {
    req.body.answer = DOMPurify.sanitize(req.body.answer, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: allowedAttributes,
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false,
      SANITIZE_DOM: true
    });
  }
  next();
};
