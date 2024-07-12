//@ts-nocheck

import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApplicationProvider } from "@/providers/ApplicationProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApplicationProvider>
        <Component {...pageProps} />
        <Toaster />
      </ApplicationProvider>
    </>
  );
}
