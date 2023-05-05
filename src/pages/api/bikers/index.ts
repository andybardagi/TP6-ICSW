import { NextApiRequest, NextApiResponse } from 'next';
import { Biker } from '@/models/Biker';
import { bikersArray } from '@/support/bikers-array';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Biker | Biker[]>
) {
  if (req.method === 'GET') {
    return res.status(200).json(bikersArray);
  }
}
