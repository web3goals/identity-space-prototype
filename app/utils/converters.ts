export function ensToShortEns(ens: string): string {
  let shortEns = ens;
  if (ens.startsWith("[") && ens.endsWith("].eth")) {
    shortEns = `${ens.substring(0, 5)}...${ens.substring(ens.length - 9)}`;
  }
  return shortEns?.toLowerCase();
}

/**
 * Convert "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1" to "0x430...c4b1".
 */
export function addressToShortAddress(address: string): string {
  let shortAddress = address;
  if (address?.length > 10) {
    shortAddress = `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  }
  return shortAddress?.toLowerCase();
}
