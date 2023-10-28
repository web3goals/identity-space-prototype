import FormikHelper from "@/components/helper/FormikHelper";
import Layout from "@/components/layout";
import { LargeLoadingButton } from "@/components/styled";
import {
  Box,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";

/**
 * Landing page.
 */
export default function Landing() {
  return (
    <Layout maxWidth="lg" hideToolbar={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {/* Image */}
        <Box flex={2} mr={{ md: 12 }}>
          <Image
            src="/images/identity.png"
            alt="Identity"
            width="100"
            height="100"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
        {/* Text with button */}
        <Box flex={3} display="flex" flexDirection="column" alignItems="start">
          <Typography variant="h6" color="text.secondary" mt={1}>
            Powered by{" "}
            <MuiLink href="https://chainbase.com/" target="_blank">
              Chainbase
            </MuiLink>{" "}
            technologies
          </Typography>
          <Typography variant="h3" fontWeight={700}>
            Discover people identities
          </Typography>
          <SearchForm />
          <Typography variant="h6" fontWeight={700} mt={8}>
            Or integrate them into your app
          </Typography>
          <Link href="/docs">
            <LargeLoadingButton variant="outlined" sx={{ mt: 1 }}>
              🚀 Docs
            </LargeLoadingButton>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}

function SearchForm() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    identity: "",
  });
  const formValidationSchema = yup.object({
    identity: yup.string().required(),
  });

  function redirectToRandomIdentity() {
    const identities = [
      "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      "vitalik.eth",
      "vitalik.lens",
      "vitalik.fcast.id",
    ];
    router.push(`/identities/${shuffle(identities)[0]}`);
  }

  return (
    <Formik
      initialValues={formValues}
      validationSchema={formValidationSchema}
      onSubmit={() => {
        router.push(`/identities/${formValues.identity}`);
      }}
    >
      {({ values, errors, touched, handleChange, setValues }) => (
        <Form style={{ width: "100%" }}>
          <FormikHelper onChange={(values: any) => setFormValues(values)} />
          <TextField
            id="identity"
            name="identity"
            placeholder="Address, ENS, Lens, Farcaster..."
            value={values.identity}
            onChange={handleChange}
            error={touched.identity && Boolean(errors.identity)}
            helperText={touched.identity && errors.identity}
            sx={{
              width: 1,
              mt: 1,
              borderRadius: "12px",
              background: "#FFFFFF",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "12px",
                },
              },
            }}
          />
          <Stack direction={{ xs: "column", md: "row" }} spacing={1} mt={2}>
            <LargeLoadingButton type="submit" variant="contained">
              🔎 Search
            </LargeLoadingButton>
            <LargeLoadingButton
              variant="outlined"
              onClick={() => redirectToRandomIdentity()}
            >
              🍀 I&apos;m Feeling Lucky
            </LargeLoadingButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
