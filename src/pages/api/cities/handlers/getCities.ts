import {City} from "@/pages/api/cities/models/City";
import {NextApiRequest, NextApiResponse} from "next";
import {citiesArray} from "@/pages/api/cities/support/cities-array";

export default function getCities(req: NextApiRequest, res: NextApiResponse<City[]>) {
    res.status(200).json(citiesArray);
}
