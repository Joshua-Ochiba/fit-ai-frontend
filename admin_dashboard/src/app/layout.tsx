import { AuthProvider } from "@/context/auth-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import LoginPage from "./admin/login/page";
import ProtectedRoute from "@/components/auth/protected-route";
import { SettingsProvider } from "@/context/settings-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit.AI | Admin Dashboard",
  description: "AI-Powered Fitness Coaching Admin",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased overflow-hidden`}>
        <SettingsProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SettingsProvider>

        {/*
        <AuthProvider>
          <LoginPage />

          <ProtectedRoute>
            <DashboardShell>
              {children}
            </DashboardShell>
          </ProtectedRoute>
        </AuthProvider>
         */}

      </body>
    </html>
  );
}
