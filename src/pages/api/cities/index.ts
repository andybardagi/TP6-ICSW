import type { NextApiRequest, NextApiResponse } from 'next';
import { City } from '@/models/City';
import { citiesArray } from '@/support/cities-array';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<City | City[]>
) {
  if (req.method === 'GET') {
    return res.status(200).json(citiesArray);
  }
}
