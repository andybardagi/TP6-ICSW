import { NextApiRequest, NextApiResponse } from 'next';
import { ValidateCardDTO } from '@/models/ValidateCardDTO';
const cardValidator = require('card-validator');

export default function handler(req: NextApiRequest, res: NextApiResponse<ValidateCardDTO>) {
  if (req.method === 'GET') {
    const isValid = cardValidator.number(req.query.cardNumber as string).isValid;
    res.status(200).json({ valid: isValid });
  }
}
