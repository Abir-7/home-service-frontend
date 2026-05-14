/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "@teispace/next-themes"; // ← change this line

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
