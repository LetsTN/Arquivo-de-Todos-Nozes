import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arquivo de Todos Nozes",
  description: "Um arquivo para preservar aquilo que jamais deveria ter sido escrito.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
