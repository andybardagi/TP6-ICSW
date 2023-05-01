import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    console.log('Order checked out', req.body);
    return res.status(200).json({
      message: 'Order saved successfully'
    })
  }
}
