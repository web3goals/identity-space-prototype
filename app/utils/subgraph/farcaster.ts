import { Identity } from "@/types/identity";
import { makeSubgraphQuery } from "./helper";

export async function findFarcasterIdentities(
  address: string
): Promise<Identity[]> {
  const query = `{
    registers(first: 100, where: {to : "${address.toLowerCase()}"}) {
        IdRegistry_id
    }
  }`;
  const result = await makeSubgraphQuery(
    process.env.NEXT_PUBLIC_SUBGRAPH_FARCASTER as string,
    query
  );
  const identites: Identity[] = [];
  for (const register of result.registers) {
    identites.push({
      address: address,
      identity: register["IdRegistry_id"],
      platform: "Farcaster",
    });
  }
  return identites;
}
