import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getBastaManagementClient } from "../../../clients";
import { users } from "src/stores/users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: "unauthorized" });
  }

  if (!session?.user?.email) {
    return res.status(401).json({ error: "email missing in user object" });
  }

  const email: string = session?.user?.email as string;

  const storeUser = users.find((user) => user.email === email);

  if (!storeUser) {
    return res
      .status(401)
      .json({ error: "no user found by provided credentials" });
  }

  if (!storeUser.isVerified) {
    return res
      .status(401)
      .json({ error: "non-verified users are not able to get bidder token" });
  }

  const bastaManagementClient = getBastaManagementClient();
  const bastaUserToken = await bastaManagementClient.genenerateBiddersToken(
    storeUser.id
  );

  return res
    .status(200)
    .json({ token: bastaUserToken.token, ttl: bastaUserToken.expiration });
};

export default handler;
