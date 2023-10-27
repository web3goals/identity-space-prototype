import axios from "axios";

export async function makeSubgraphQuery(
  url: string,
  query: string
): Promise<any> {
  try {
    const response = await axios.post(url, { query: query });
    if (response.data.errors) {
      throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      `Could not query the subgraph "${url}": ${JSON.stringify(error.message)}`
    );
  }
}
