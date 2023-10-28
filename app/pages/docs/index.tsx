import Layout from "@/components/layout";
import { Typography, Link as MuiLink, Box, Chip, Stack } from "@mui/material";

/**
 * Landing page.
 */
export default function Landing() {
  const apiUrl = "https://identity-space.vercel.app/api";

  return (
    <Layout maxWidth="md">
      <Typography variant="h4" fontWeight={700}>
        👋 Hello there!
      </Typography>
      <Typography mt={1}>
        This API enable developers to easily and quickly integrate identities
        from ENS, Lens and Farcaster into their applications.
      </Typography>
      <Typography mt={1}>
        This API is already integrated into the{" "}
        <MuiLink href="/" target="_blank" fontWeight={700}>
          discover
        </MuiLink>{" "}
        page.
      </Typography>
      <Typography color="text.secondary" mt={2}>
        ⚡ Powered by{" "}
        <MuiLink href="https://chainbase.com/" target="_blank" fontWeight={700}>
          Chainbase
        </MuiLink>{" "}
        technologies.
      </Typography>
      {/* Link */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          background: "#FFFFFF",
          borderRadius: "8px",
          mt: 4,
        }}
      >
        <Box
          sx={{
            background: "#000000",
            borderRadius: "8px",
            py: 1,
            px: 2,
            m: 1,
          }}
        >
          <Typography color="#FFFFFF" fontWeight={700}>
            GET
          </Typography>
        </Box>
        <Typography ml={0.5}>
          {apiUrl}
          <strong>/identity/&#123;fragment&#125;</strong>
        </Typography>
      </Box>
      {/* Parameter */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight={700}>
          Parameter
        </Typography>
        <Typography mt={1}>
          <strong>identity</strong> (string) - An Ethereum address, an ENS
          domain (vitalik.eth), a Lens handle (vitalik.lens), a Farcaster
          username (vitalik.fcast.id).
        </Typography>
      </Box>
      {/* Examples */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight={700}>
          Examples
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Chip label="Ethereum" />
          <Typography color="text.secondary">
            /identity/0xd8da6bf26964af9d7eed9e03e53415d37aa96045
          </Typography>
          <MuiLink
            href={`${apiUrl}/identity/0xd8da6bf26964af9d7eed9e03e53415d37aa96045`}
            target="_blank"
            fontSize={18}
          >
            🔗
          </MuiLink>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Chip label="ENS" />
          <Typography color="text.secondary">/identity/vitalik.eth</Typography>
          <MuiLink
            href={`${apiUrl}/identity/vitalik.eth`}
            target="_blank"
            fontSize={18}
          >
            🔗
          </MuiLink>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Chip label="Lens" />
          <Typography color="text.secondary">/identity/vitalik.lens</Typography>
          <MuiLink
            href={`${apiUrl}/identity/vitalik.lens`}
            target="_blank"
            fontSize={18}
          >
            🔗
          </MuiLink>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Chip label="Fragment" />
          <Typography color="text.secondary">
            /identity/vitalik.fcast.id
          </Typography>
          <MuiLink
            href={`${apiUrl}/identity/vitalik.fcast.id`}
            target="_blank"
            fontSize={18}
          >
            🔗
          </MuiLink>
        </Stack>
      </Box>
      {/* Response */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight={700}>
          Response
        </Typography>
        <Box
          sx={{
            background: "#FFFFFF",
            borderRadius: "12px",
            px: 4,
            py: 2,
            mt: 2,
          }}
        >
          <pre>
            {JSON.stringify(
              [
                {
                  address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
                  identity: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
                  platform: "ETH",
                },
                {
                  address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
                  identity: "vitalik.eth",
                  platform: "ENS",
                },
                {
                  address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
                  identity: "vitalik.lens",
                  platform: "LENS",
                },
              ],
              null,
              2
            )}
          </pre>
        </Box>
      </Box>
    </Layout>
  );
}
