import "@/utils/wdyr";

import "@/global.scss";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          width: "unset",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          flexGrow: "unset",
        },
      },
    },
  },
});

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache?: EmotionCache }) {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
