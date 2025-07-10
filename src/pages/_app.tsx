import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
//import "@mantine/core/styles.layer.css";

import Layout from "@/components/Layout/dashboard";
import { store } from "@/lib/redux";
import { theme } from "@/lib/theme";

import { Notifications } from "@mantine/notifications";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // The app only has one layout (Layout component is the default layout) )
  // Login and Signup pages have their own
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </MantineProvider>
  );
}
