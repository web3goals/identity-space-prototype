import { Identity } from "@/types/identity";
import { ethers } from "ethers";
import { getFarcasterOwnerAddress } from "./farcaster";
import { findAddressByEns, findEnsIdentities } from "./subgraph/ens";
import { findFarcasterIdentities } from "./subgraph/farcaster";
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
    return findIdentitiesByFarcaster(fragment);
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
  const farcasterIdentities = await findFarcasterIdentities(address);
  return [
    ethIdentity,
    ...ensIdentities,
    ...lensIdentities,
    ...farcasterIdentities,
  ];
}

async function findIdentitiesByEns(ens: string): Promise<Identity[]> {
  const address = await findAddressByEns(ens);
  return findIdentitiesByAddress(address);
}

async function findIdentitiesByLens(lens: string): Promise<Identity[]> {
  const address = await findAddressByLens(lens);
  return findIdentitiesByAddress(address);
}

async function findIdentitiesByFarcaster(
  farcaster: string
): Promise<Identity[]> {
  const address = await getFarcasterOwnerAddress(farcaster);
  if (!address) {
    return [];
  }
  return findIdentitiesByAddress(address);
}
