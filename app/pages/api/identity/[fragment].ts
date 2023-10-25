import { errorToPrettyError } from "@/utils/errors";
import { findIdentitiesByFragment } from "@/utils/identity";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Define params
    const fragment = req.query.fragment;
    const identity = await findIdentitiesByFragment(fragment as string);
    res.status(200).json(identity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: errorToPrettyError(error) });
  }
}
