import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Amplitude } from "@/components/Permission/Amplitude";
import { CookieBar } from "@/components/Permission/CookieBar";
import { AuthProvider } from "@/contexts/AuthContext";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { AxsysThemeProvider } from "@/providers/AxsysThemeProvider";
import { DateProvider } from "@/providers/DateProvider";
import { TanstackQueryProvider } from "@/providers/TanstackProvider";
import "./global.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axenya - Portal do RH",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <AxsysThemeProvider>
          <DateProvider>
            <TanstackQueryProvider>
              <SnackbarProvider>
                <AuthProvider>{children}</AuthProvider>
                <CookieBar />
                <Amplitude />
              </SnackbarProvider>
            </TanstackQueryProvider>
          </DateProvider>
        </AxsysThemeProvider>
      </body>
    </html>
  );
}
