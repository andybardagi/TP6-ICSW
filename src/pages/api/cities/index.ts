import type { NextApiRequest, NextApiResponse } from 'next'
import {City} from "@/pages/api/cities/models/City";
import getCities from "@/pages/api/cities/handlers/getCities";

export default function handler(req: NextApiRequest, res: NextApiResponse<City | City[]>) {
    if (req.method === 'GET') {
        return getCities(req, res);
    }
}
