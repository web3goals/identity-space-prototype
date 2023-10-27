import { Identity } from "@/types/identity";
import { makeSubgraphQuery } from "./helper";

export async function findAddressByLens(
  lens: string
): Promise<string | undefined> {
  const query = `{
    profiles(first: 1, where: {handle : "${lens.toLowerCase()}"}) {
      owner
    }
  }`;
  const result = await makeSubgraphQuery(
    process.env.NEXT_PUBLIC_SUBGRAPH_LENS as string,
    query
  );
  return result.profiles?.[0]?.owner;
}

export async function findLensIdentities(address: string): Promise<Identity[]> {
  const query = `{
    profiles(first: 100, where: {owner : "${address.toLowerCase()}"}) {
      handle
    }
  }`;
  const result = await makeSubgraphQuery(
    process.env.NEXT_PUBLIC_SUBGRAPH_LENS as string,
    query
  );
  const identites: Identity[] = [];
  for (const profile of result.profiles) {
    identites.push({
      address: address,
      identity: profile.handle,
      platform: "Lens",
    });
  }
  return identites;
}
