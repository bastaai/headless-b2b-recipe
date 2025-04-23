import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";
import { users } from "src/stores/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Authentication session is mandatory
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ error: "unauthorized" });
  }

  // Missing email in profile fails request
  if (!session.user.email) {
    return res.status(501).json({ error: "missing email in session" });
  }

  // Fetch user profile from fixed user file
  const user = users.find((user) => user.email === session.user?.email);

  if (!user) {
    return res.status(501).send("user profile does not exists on record");
  }

  res.status(201).send(user);
}
