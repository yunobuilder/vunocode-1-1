import rateLimit from 'express-rate-limit';
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: 'Muitas requisições, por favor tente novamente mais tarde.'
});
