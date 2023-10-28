import EntityList from "@/components/entity/EntityList";
import Layout from "@/components/layout";
import {
  CardBox,
  FullWidthSkeleton,
  LargeLoadingButton,
  MediumLoadingButton,
} from "@/components/styled";
import useError from "@/hooks/useError";
import useToasts from "@/hooks/useToast";
import { Identity as IdentityType } from "@/types/identity";
import { emojiAvatarForAddress } from "@/utils/avatars";
import { addressToShortAddress, ensToShortEns } from "@/utils/converters";
import {
  Avatar,
  Box,
  Stack,
  SxProps,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import axios from "axios";
import { ethers } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Page with an identity.
 */
export default function Identity() {
  const router = useRouter();
  const { identity } = router.query;
  const { handleError } = useError();
  const [identities, setIdentities] = useState<IdentityType[] | undefined>();

  useEffect(() => {
    setIdentities(undefined);
    if (identity) {
      axios
        .get(`/api/identity/${identity as string}`)
        .then(({ data }) => setIdentities(data))
        .catch((error) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  return (
    <Layout maxWidth="sm">
      {identity ? (
        <>
          <IdentityCover identity={identity as string} />
          <EntityList
            entities={identities}
            renderEntityCard={(identity, index) => (
              <IdentityCard identity={identity} key={index} />
            )}
            noEntitiesText="😐 no identities"
            sx={{ mt: 2 }}
          />
          <WarningCard sx={{ mt: 2 }} />
        </>
      ) : (
        <FullWidthSkeleton />
      )}
    </Layout>
  );
}

function IdentityCover(props: { identity: string }) {
  const { showToastSuccess } = useToasts();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        sx={{
          width: 164,
          height: 164,
          borderRadius: 164,
          background: ethers.isAddress(props.identity)
            ? emojiAvatarForAddress(props.identity).color
            : "#FFFFFF",
        }}
      >
        <Typography fontSize={72}>
          {ethers.isAddress(props.identity)
            ? emojiAvatarForAddress(props.identity).emoji
            : "🆔"}
        </Typography>
      </Avatar>
      <Typography variant="h4" fontWeight={700} mt={2}>
        {ethers.isAddress(props.identity)
          ? addressToShortAddress(props.identity)
          : props.identity}
      </Typography>
      <LargeLoadingButton
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => {
          navigator.clipboard.writeText(
            `${global.window.location.origin}/identity/${props.identity}`
          );
          showToastSuccess("Link copied!");
        }}
      >
        📢 Share
      </LargeLoadingButton>
    </Box>
  );
}

function IdentityCard(props: { identity: IdentityType }) {
  const platforms = {
    ETH: {
      image: "/images/eth.png",
      title: "Ethereum",
    },
    ENS: {
      image: "/images/ens.png",
      title: "ENS",
    },
    Lens: {
      image: "/images/lens.png",
      title: "Lens",
    },
    Farcaster: {
      image: "/images/farcaster.png",
      title: "Farcaster",
    },
  };

  return (
    <CardBox sx={{ display: "flex", flexDirection: "row" }}>
      {/* Left part */}
      <Box>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            borderRadius: 72,
          }}
          src={platforms[props.identity.platform].image}
        />
      </Box>
      {/* Right part */}
      <Box
        width={1}
        ml={3}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Typography variant="h6" fontWeight={700}>
          {platforms[props.identity.platform].title}
        </Typography>
        {props.identity.platform === "ETH" && (
          <IdentityCardFooterEth identity={props.identity} />
        )}
        {props.identity.platform === "ENS" && (
          <IdentityCardFooterEns identity={props.identity} />
        )}
        {props.identity.platform === "Lens" && (
          <IdentityCardFooterLens identity={props.identity} />
        )}
        {props.identity.platform === "Farcaster" && (
          <IdentityCardFooterFarcaster identity={props.identity} />
        )}
      </Box>
    </CardBox>
  );
}

function IdentityCardFooterEth(props: {
  identity: IdentityType;
  sx?: SxProps;
}) {
  const { showToastSuccess } = useToasts();

  return (
    <Box sx={{ ...props.sx }}>
      <Typography color="text.secondary">
        {addressToShortAddress(props.identity.identity)}
      </Typography>
      <Stack direction="row" spacing={1} mt={1}>
        <MediumLoadingButton
          href={`https://etherscan.io/address/${props.identity.identity}`}
          target="_blank"
          variant="contained"
        >
          🌍 Etherscan
        </MediumLoadingButton>
        <MediumLoadingButton
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(props.identity.identity);
            showToastSuccess("Copied!");
          }}
        >
          📄 Copy
        </MediumLoadingButton>
      </Stack>
    </Box>
  );
}

function IdentityCardFooterEns(props: {
  identity: IdentityType;
  sx?: SxProps;
}) {
  const { showToastSuccess } = useToasts();

  return (
    <Box sx={{ ...props.sx }}>
      <Typography color="text.secondary">
        {ensToShortEns(props.identity.identity)}
      </Typography>
      <Stack direction="row" spacing={1} mt={1}>
        <MediumLoadingButton
          href={`https://app.ens.domains/${props.identity.identity}`}
          target="_blank"
          variant="contained"
        >
          🌍 ENS Domains
        </MediumLoadingButton>
        <MediumLoadingButton
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(props.identity.identity);
            showToastSuccess("Copied!");
          }}
        >
          📄 Copy
        </MediumLoadingButton>
      </Stack>
    </Box>
  );
}

function IdentityCardFooterLens(props: {
  identity: IdentityType;
  sx?: SxProps;
}) {
  const { showToastSuccess } = useToasts();

  return (
    <Box sx={{ ...props.sx }}>
      <Typography color="text.secondary">{props.identity.identity}</Typography>
      <Stack direction="row" spacing={1} mt={1}>
        <MediumLoadingButton
          href={`https://hey.xyz/u/${props.identity.identity}`}
          target="_blank"
          variant="contained"
        >
          🌍 Hey
        </MediumLoadingButton>
        <MediumLoadingButton
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(props.identity.identity);
            showToastSuccess("Copied!");
          }}
        >
          📄 Copy
        </MediumLoadingButton>
      </Stack>
    </Box>
  );
}

function IdentityCardFooterFarcaster(props: {
  identity: IdentityType;
  sx?: SxProps;
}) {
  const { showToastSuccess } = useToasts();
  const { handleError } = useError();
  const [farcasterName, setFactasterName] = useState<string | undefined>();

  useEffect(() => {
    axios
      .get(
        `https://fnames.farcaster.xyz/transfers?fid=${props.identity.identity}`
      )
      .then(({ data }) => setFactasterName(data.transfers?.[0]?.username))
      .catch((error) => handleError(error, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.identity]);

  if (!farcasterName) {
    return <FullWidthSkeleton />;
  }

  return (
    <Box sx={{ ...props.sx }}>
      <Typography color="text.secondary">{farcasterName}.fcast.id</Typography>
      <Stack direction="row" spacing={1} mt={1}>
        <MediumLoadingButton
          href={`https://warpcast.com/${farcasterName}`}
          target="_blank"
          variant="contained"
        >
          🌍 Warpcast
        </MediumLoadingButton>
        <MediumLoadingButton
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(props.identity.identity);
            showToastSuccess("Copied!");
          }}
        >
          📄 Copy
        </MediumLoadingButton>
      </Stack>
    </Box>
  );
}

function WarningCard(props: { sx?: SxProps }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#FFC833",
        borderRadius: "10px",
        px: 5,
        py: 3,
        ...props.sx,
      }}
    >
      <Typography fontSize={32}>👻</Typography>
      <Typography variant="h6" fontWeight={700} textAlign="center">
        This project is in beta right now
      </Typography>
      <Typography textAlign="center" mt={0.5}>
        Because of this, some data from ENS, Lens, Farcaster may not be
        available, but you can test this application at the following links:
      </Typography>
      <Link
        href="/identities/0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
        passHref
        legacyBehavior
      >
        <MuiLink variant="body2" fontWeight={700} mt={2}>
          🔗 0xd8da...6045
        </MuiLink>
      </Link>
      <Link href="/identities/vitalik.eth" passHref legacyBehavior>
        <MuiLink variant="body2" fontWeight={700} mt={1}>
          🔗 vitalik.eth
        </MuiLink>
      </Link>
      <Link href="/identities/vitalik.lens" passHref legacyBehavior>
        <MuiLink variant="body2" fontWeight={700} mt={1}>
          🔗 vitalik.lens
        </MuiLink>
      </Link>
      <Link href="/identities/vitalik.fcast.id" passHref legacyBehavior>
        <MuiLink variant="body2" fontWeight={700} mt={1}>
          🔗 vitalik.fcast.id
        </MuiLink>
      </Link>
    </Box>
  );
}
