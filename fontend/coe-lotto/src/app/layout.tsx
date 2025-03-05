import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardPage from "./dashboards/page";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <DashboardPage/>
      </body>
    </html>
  );
}
