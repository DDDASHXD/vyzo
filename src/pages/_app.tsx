//@ts-nocheck

import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApplicationProvider } from "@/providers/ApplicationProvider";
import Update from "./update";
import { ThemeProvider } from "@/providers/theme-provider";
import { DragDropContext } from "react-beautiful-dnd";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  const handleOnDragEnd = (result) => {};
  const { dragging, dragged } = React.useContext(ApplicationContext);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ApplicationProvider>
          <DragDropContext>
            <div className="">
              <Component {...pageProps} />
            </div>
          </DragDropContext>
          <Toaster />
          <Update />
        </ApplicationProvider>
      </ThemeProvider>
    </>
  );
}
