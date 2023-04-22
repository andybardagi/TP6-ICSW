import {NextApiRequest, NextApiResponse} from "next";
import {PaymentResult} from "@/models/PaymentResult";


export default function handler(req: NextApiRequest, res: NextApiResponse<PaymentResult>) {
  if (req.method === 'POST') {
    // If the payment method is mastercard the payment is rejected
    if (req.body.paymentMethod.name === 'mastercard') {
      return res.status(400).json({
        result: 'Error',
        error: 'Payment rejected'
      })
    }
    return res.status(200).json({
      result: 'Ok'
    })
  }
}
