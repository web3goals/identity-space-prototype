import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  /**
   * Fix for hydration error (docs - https://github.com/vercel/next.js/discussions/35773#discussioncomment-3484225)
   */
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <NextNProgress height={4} color={theme.palette.primary.main} />
        {isPageLoaded && <Component {...pageProps} />}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
