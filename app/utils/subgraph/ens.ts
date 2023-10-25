import { Identity } from "@/types/identity";
import { makeSubgraphQuery } from "./helper";

export async function findAddressByEns(
  ens: string
): Promise<string | undefined> {
  const query = `{
    domains(first: 1, where: {name : "${ens.toLowerCase()}"}) {
      owner {
        id
      }
    }
  }`;
  const result = await makeSubgraphQuery(
    process.env.NEXT_PUBLIC_SUBGRAPH_ENS as string,
    query
  );
  return result.domains?.[0]?.owner.id;
}

export async function findEnsIdentities(address: string): Promise<Identity[]> {
  const query = `{
    domains(first: 100, where: {owner : "${address.toLowerCase()}"}) {
      name
    }
  }`;
  const result = await makeSubgraphQuery(
    process.env.NEXT_PUBLIC_SUBGRAPH_ENS as string,
    query
  );
  const identites: Identity[] = [];
  for (const domain of result.domains) {
    identites.push({
      address: address,
      identity: domain.name,
      platform: "ENS",
    });
  }
  return identites;
}
