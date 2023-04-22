import {NextApiRequest, NextApiResponse} from "next";

export default function saveOrder(req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).json({
        message: 'Order saved successfully'
    })
}
