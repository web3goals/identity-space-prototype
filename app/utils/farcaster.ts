import axios from "axios";

export async function getFarcasterOwnerAddress(
  farcaster: string
): Promise<string | undefined> {
  const name = farcaster.replace(".fcast.id", "");
  const url = `https://fnames.farcaster.xyz/transfers?name=${name}`;
  const response = await axios.get(url);
  if (response.data.errors) {
    throw new Error(JSON.stringify(response.data.errors));
  }
  return response.data.transfers?.[0]?.owner;
}
