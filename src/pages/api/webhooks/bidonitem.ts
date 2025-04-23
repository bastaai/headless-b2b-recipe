import { NextApiRequest, NextApiResponse } from "next";
import { BastaBidOnItemActionBody, BidOnItemWebhookResponse } from "./models";

interface BidOnItemActionNextApiRequest extends NextApiRequest {
  body: BastaBidOnItemActionBody;
}

export default async function handler(
  req: BidOnItemActionNextApiRequest,
  res: NextApiResponse<BidOnItemWebhookResponse>
) {
  throw new Error("implement");
}
