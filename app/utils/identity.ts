import { Identity } from "@/types/identity";
import { ethers } from "ethers";
import { findAddressByEns, findEnsIdentities } from "./subgraph/ens";
import { findAddressByLens, findLensIdentities } from "./subgraph/lens";

export async function findIdentitiesByFragment(
  fragment?: string
): Promise<Identity[]> {
  if (fragment && ethers.isAddress(fragment)) {
    return findIdentitiesByAddress(fragment);
  }
  if (fragment && fragment.endsWith(".eth")) {
    return findIdentitiesByEns(fragment);
  }
  if (fragment && fragment.endsWith(".lens")) {
    return findIdentitiesByLens(fragment);
  }
  if (fragment && fragment.endsWith(".fcast.id")) {
    // TODO:
  }
  throw new Error("Fragment is not supported");
}

async function findIdentitiesByAddress(address?: string): Promise<Identity[]> {
  if (!address || !ethers.isAddress(address)) {
    return [];
  }
  const ethIdentity: Identity = {
    address: address,
    identity: address,
    platform: "ETH",
  };
  const ensIdentities = await findEnsIdentities(address);
  const lensIdentities = await findLensIdentities(address);
  return [ethIdentity, ...ensIdentities, ...lensIdentities];
}

async function findIdentitiesByEns(ens: string): Promise<Identity[]> {
  const address = await findAddressByEns(ens);
  return findIdentitiesByAddress(address);
}

async function findIdentitiesByLens(lens: string): Promise<Identity[]> {
  const address = await findAddressByLens(lens);
  return findIdentitiesByAddress(address);
}
