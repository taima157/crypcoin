import "./globals.css";
import { CryptoProvider } from "@/context/crypto";

export const metadata = {
  title: "CrypCoin",
  description: "A cryptocurrency management website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <CryptoProvider>{children}</CryptoProvider>
      </body>
    </html>
  );
}
