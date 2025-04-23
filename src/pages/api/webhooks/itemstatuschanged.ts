import { NextApiRequest, NextApiResponse } from "next";
import {
  BidOnItemWebhookResponse,
  ItemStatusChangedActionBody,
} from "./models";

interface ItemStatusChangedNextApiRequest extends NextApiRequest {
  body: ItemStatusChangedActionBody;
}

export default async function handler(
  req: ItemStatusChangedNextApiRequest,
  res: NextApiResponse<BidOnItemWebhookResponse>
) {
  throw new Error("implement")

}
