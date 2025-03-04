import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardLayout from "./dashboards/layout";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <DashboardLayout/>
      </body>
    </html>
  );
}
