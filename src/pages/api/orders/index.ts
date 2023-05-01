import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        return res.status(200).json({
            message: 'Order saved successfully'
        })
    }
}
