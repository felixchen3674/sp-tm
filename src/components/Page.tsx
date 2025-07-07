import Head from "next/head";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, forwardRef, useEffect } from "react";

import { Box, BoxProps } from "@mantine/core";

interface PageProps extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}
export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = "", meta, ...other }, ref) => {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <Box ref={ref} {...other}>
          {children}
        </Box>
      </>
    );
  },
);
