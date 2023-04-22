import {NextApiRequest, NextApiResponse} from "next";
import {Order} from "@/pages/api/orders/models/Order";
import saveOrder from "@/pages/api/orders/handlers/saveOrder";

export default function handler(req: NextApiRequest, res: NextApiResponse<Order>) {
    if (req.method === 'POST') {
        return saveOrder(req, res);
    }
}
